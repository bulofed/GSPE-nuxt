import { defineStore } from 'pinia';
import type { ITeacher } from '~/types';

interface ITeacherResponse {
  teachers: ITeacher[];
}

interface ISingleTeacherResponse {
  teacher: ITeacher;
}

export const useTeacherStore = defineStore({
  id: 'teacher',
  state: () => ({
    teachers: [] as ITeacher[],
    teacher: {} as ITeacher,
  }),
  actions: {
    async fetchTeachers() {
        const response = await $fetch<ITeacherResponse>('/api/teacher/all-teachers', {
            method: 'GET',
        });
        this.teachers = response.teachers as ITeacher[];
        return this.teachers;
    },
    async fetchTeacher(id: string) {
        const response = await $fetch<ISingleTeacherResponse>(`/api/teacher/${id}`, {
            method: 'GET',
        });
        this.teacher = response.teacher as ITeacher;
        return this.teacher;
    },
    async deleteTeacher(id: string) {
        await $fetch(`/api/teacher/${id}`, {
            method: 'DELETE',
        });
        await this.fetchTeachers();
    },
    async createTeacher(teacher: ITeacher) {
        await $fetch('/api/teacher/add', {
            method: 'POST',
            body: JSON.stringify(teacher),
        });
        await this.fetchTeachers();
    },
    async updateTeacher(id: string, teacher: ITeacher) {
        await $fetch(`/api/teacher/${id}`, {
            method: 'PUT',
            body: JSON.stringify(teacher),
        });
        await this.fetchTeachers();
    },
    async fetchAllTeachersResources() {
      const teachers = await this.fetchTeachers();
      const resources = new Set<string>();
      for (const teacher of teachers) {
          for (const resource of teacher.resources) {
              resources.add(resource.name);
          }
      }
      return Array.from(resources);
    },
    async fetchMissingResourcesForTeacher(id: string) {
      const allResources = await this.fetchAllTeachersResources();
      const teacher = await this.fetchTeacher(id);
      const teacherResources = teacher.resources.map(resource => resource.name);
      const missingResources = allResources.filter(resource => !teacherResources.includes(resource));
    
      return missingResources;
    },
    async addResourceToTeacher(id: string, resource: string) {
      const teacher = await this.fetchTeacher(id);
      const teacherInfo = { ...teacher, resources: [...teacher.resources, { name: resource, lessons: [] }] };
      await this.updateTeacher(id, teacherInfo);
    },
  },
  
});