export const fetchTeachers = async () => {
    const response = await $fetch('/api/teacher/all-teachers', {
      method: 'GET',
    });
    return response.teachers as any;
};
  
export const deleteTeacher = async (id: string) => {
  await $fetch(`/api/teacher/${id}`, {
      method: 'DELETE',
  });
  return id;
};