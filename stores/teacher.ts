import { defineStore } from 'pinia'
import type { ITeacher, IResource, ILesson, IResourceInfo } from '~/types'

interface ITeacherResponse {
  teachers: ITeacher[]
}

interface ISingleTeacherResponse {
  teacher: ITeacher
}

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
      const resources = new Map<string, IResource>()
      for (const teacher of teachers) {
        for (const resource of teacher.resources) {
          resources.set(resource.name, resource)
        }
      }
      return Array.from(resources.values())
    },
    async fetchMissingResourcesForTeacher(id: string) {
      const allResources = await this.fetchAllTeachersResources()
      const teacher = await this.fetchTeacher(id)
      const teacherResources = teacher.resources
      const missingResources = allResources.filter(
        (resource) =>
          !teacherResources.some(
            (teacherResource) =>
              teacherResource.name === resource.name
          )
      )

      return missingResources
    },
    async addResourceToTeacher(id: string, resource: IResource) {
      const teacher = await this.fetchTeacher(id)
      const newTeacher: ITeacher = {
        ...teacher,
        resources: [...teacher.resources, resource],
      }
      await this.updateTeacher(id, newTeacher)
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
      const resources = {} as Record<string, IResourceInfo>

      for (const teacher of teachers) {
        for (const resource of teacher.resources) {
          if (resource.name.toLowerCase().includes(query.toLowerCase()) || resource.libelle.toLowerCase().includes(query.toLowerCase())) {
            resources[resource.name] = { resource, teacherInfo: teacher.info };
          }
        }
      }
      return Object.values(resources);
    }
  },
})