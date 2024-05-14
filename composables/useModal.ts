const show = ref(false);
const teacher_id = ref('');

const component = ref();

export function useModal() {
    return {
        component,
        show,
        teacher_id,
        showModal: () => show.value = true,
        hideModal: () => show.value = false,
    }
}