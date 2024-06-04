import { defineStore } from 'pinia'
import type { ITeacher, IResource, ILesson, ITeacherInfo } from '~/types'

interface ITeacherResponse {
  teachers: ITeacher[]
}

interface ISingleTeacherResponse {
  teacher: ITeacher
}

type LessonWithTeacher = ILesson & { teacher: ITeacherInfo };

export const useTeacherStore = defineStore({
  id: 'teacher',
  state: () => ({
    teachers: [] as ITeacher[],
    teacher: {} as ITeacher,
  }),
  actions: {
    async fetchTeachers() {
      try {
        const response = await $fetch<ITeacherResponse>(
          '/api/teacher/all-teachers',
          {
            method: 'GET',
          }
        )
        if (response) {
          this.teachers = response.teachers as ITeacher[]
        }
      } catch (error) {
        console.error('Failed to fetch teachers:', error)
      }
      return this.teachers
    },
    async fetchTeacher(id: string) {
      try {
        const response = await $fetch<ISingleTeacherResponse>(
          `/api/teacher/${id}`,
          {
            method: 'GET',
          }
        )
        if (response) {
          this.teacher = response.teacher as ITeacher
        }
      } catch (error) {
        console.error(`Failed to fetch teacher with id ${id}:`, error)
      }
      return this.teacher
    },
    async deleteTeacher(id: string) {
      await $fetch(`/api/teacher/${id}`, {
        method: 'DELETE',
      })
      await this.fetchTeachers()
    },
    async createTeacher(teacher: ITeacher) {
      await $fetch('/api/teacher/add', {
        method: 'POST',
        body: JSON.stringify(teacher),
      })
      await this.fetchTeachers()
    },
    async updateTeacher(id: string, teacher: ITeacher) {
      await $fetch(`/api/teacher/${id}`, {
        method: 'PUT',
        body: JSON.stringify(teacher),
      })
      await this.fetchTeachers()
    },
    async fetchAllTeachersResources() {
      const teachers = await this.fetchTeachers()
      const resources = new Set<string>()
      for (const teacher of teachers) {
        for (const resource of teacher.resources) {
          resources.add(resource.name)
        }
      }
      return Array.from(resources)
    },
    async fetchMissingResourcesForTeacher(id: string) {
      const allResources = await this.fetchAllTeachersResources()
      const teacher = await this.fetchTeacher(id)
      const teacherResources = teacher.resources.map(
        (resource) => resource.name
      )
      const missingResources = allResources.filter(
        (resource) => !teacherResources.includes(resource)
      )

      return missingResources
    },
    async addResourceToTeacher(id: string, resource: string) {
      const teacher = await this.fetchTeacher(id)
      const teacherInfo = {
        ...teacher,
        resources: [...teacher.resources, { name: resource, lessons: [] }],
      }
      await this.updateTeacher(id, teacherInfo)
    },
    async deleteResource(teacherId: string, resource: IResource) {
      const teacher = await this.fetchTeacher(teacherId)
      const newTeacher: ITeacher = {
        ...teacher,
        resources: teacher.resources.filter(
          (existingResource) =>
            existingResource._id?.toString() !== resource._id?.toString()
        ),
      }

      await this.updateTeacher(teacherId, newTeacher)
    },
    async addLesson(teacherId: string, resource: IResource) {
      const teacher = await this.fetchTeacher(teacherId)
      const newTeacher: ITeacher = {
        ...teacher,
        resources: teacher.resources.map((existingResource) => {
          if (existingResource._id?.toString() === resource._id?.toString()) {
            return {
              ...existingResource,
              lessons: [
                ...existingResource.lessons,
                {
                  name: '',
                  hours: 1,
                },
              ],
            }
          } else {
            return existingResource
          }
        }),
      }

      await this.updateTeacher(teacherId, newTeacher)
    },
    async updateResource(teacherId: string, resource: IResource) {
      const teacher = await this.fetchTeacher(teacherId)
      const newTeacher: ITeacher = {
        ...teacher,
        resources: teacher.resources.map((existingResource) => {
          if (existingResource._id?.toString() === resource._id?.toString()) {
            return resource
          } else {
            return existingResource
          }
        }),
      }
    
      if (newTeacher == teacher) {
        return
      }
    
      await this.updateTeacher(teacherId, newTeacher)
    },
    async updateLesson(teacherId: string, resource: IResource, lesson: ILesson) {
      const teacher = await this.fetchTeacher(teacherId)
      const newTeacher: ITeacher = {
        ...teacher,
        resources: teacher.resources.map((newResource) => {
          if (newResource._id?.toString() === resource._id?.toString()) {
            return {
              ...newResource,
              lessons: newResource.lessons.map((existingLesson) => {
                if (existingLesson._id?.toString() === lesson._id?.toString()) {
                  return lesson
                } else {
                  return existingLesson
                }
              }),
            }
          } else {
            return newResource
          }
        }),
      }
    
      if (newTeacher == teacher) {
        return
      }
    
      await this.updateTeacher(teacherId, newTeacher)
    },
    async deleteLesson(teacherId: string, resource: IResource, lesson: ILesson) {
      const teacher = await this.fetchTeacher(teacherId)
      const newTeacher: ITeacher = {
        ...teacher,
        resources: teacher.resources.map((newResource) => {
          if (newResource._id?.toString() === resource._id?.toString()) {
            return {
              ...newResource,
              lessons: newResource.lessons.filter(
                (existingLesson) =>
                  existingLesson._id?.toString() !== lesson._id?.toString()
              ),
            }
          } else {
            return newResource
          }
        }),
      }
    
      await this.updateTeacher(teacherId, newTeacher)
    },
    async search(query: string) {
      // Returns a list of resources that match the query
      const teachers = await this.fetchTeachers()
      const resources: { [key: string]: IResource } = {};

      for (const teacher of teachers) {
        for (const resource of teacher.resources) {
          const lessonsWithTeacher: LessonWithTeacher[] = resource.lessons.map(lesson => ({
            ...lesson,
            teacher: teacher.info,
          }));

          if (!resources[resource.name]) {
            resources[resource.name] = {
              _id: resource._id,
              name: resource.name,
              teachers: [teacher.info],
              lessons: lessonsWithTeacher,
            };
          } else {
            resources[resource.name].teachers!.push(teacher.info);
            resources[resource.name].lessons.push(...lessonsWithTeacher);
          }
        }
      }
      return Object.values(resources).filter((resource) =>
        resource.name.toLowerCase().includes(query.toLowerCase())
      )
    }
  },
})