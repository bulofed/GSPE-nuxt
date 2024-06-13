<script lang="ts" setup>
import { useTeacherStore } from '~/stores/teacher'

import ModuleTitle from '../elements/ModuleTitle.vue';

import Teacher from './Teacher.vue'
import Resource from './Resource.vue'

import type { ITeacher, IResource } from '~/types'

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const teacherStore = useTeacherStore()
const query = ref('')
const res = ref<IResource[]>([])

onMounted(async() => {
  await teacherStore.fetchTeachers()
})

watch(query, async () => {
  if (query.value.length < 1) {
    res.value = []
    return
  }
  res.value = await teacherStore.search(query.value)
})

function calculateTotalHours(teacher: ITeacher): number {
  let totalHours = 0;

  for (const resource of teacher.resources) {
    for (const lesson of resource.lessons) {
      totalHours += lesson.hours;
    }
  }

  return totalHours;
}

const totalHours = computed(() => {
  return teacherStore.teachers.reduce((total, teacher) => total + calculateTotalHours(teacher), 0)
})

const generatePDF = async() => {
  const pdfDoc = await PDFDocument.create()
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const pageMargin = 50
  const fontSizeTitle = 30
  const fontSize = 16
  const lineHeight = fontSize * 1.2
  let page = pdfDoc.addPage()
  let { width, height } = page.getSize()
  let y = height - pageMargin

  const addNewPage = () => {
    page = pdfDoc.addPage()
    width = page.getSize().width
    height = page.getSize().height
    y = height - pageMargin
  }

  page.drawText('Planning', {
    x: (width - pageMargin * 2) / 2 - 50,
    y: y - fontSizeTitle,
    size: fontSizeTitle,
    font: helveticaFont,
    color: rgb(0, 0, 0)
  })

  y -= fontSizeTitle + lineHeight

  for (const teacher of teacherStore.teachers) {
    if (y < pageMargin + lineHeight) addNewPage()

    page.drawText(`Enseignant: ${teacher.info.firstname} ${teacher.info.lastname}`, {
      x: pageMargin,
      y: y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    })

    y -= lineHeight

    for (const resource of teacher.resources) {
      if (y < pageMargin + lineHeight) addNewPage()

      page.drawText(`Ressource: ${resource.name}`, {
        x: pageMargin + 20,
        y: y,
        size: fontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      })

      y -= lineHeight

      for (const lesson of resource.lessons) {
        if (y < pageMargin + lineHeight) addNewPage()

        page.drawText(`Leçon: ${lesson.name}, Nombre d'heure: ${lesson.hours}`, {
          x: pageMargin + 40,
          y: y,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0)
        })

        y -= lineHeight
      }
    }
  }

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  window.open(url)
}
</script>

<template>
  <div class="border rounded-xl text-center overflow-hidden dark:border-slate-900/50 bg-slate-100 dark:bg-slate-700 col-span-4">
    <ModuleTitle>Planning  <button class="btn hover:bg-black/10 absolute right-2" @click="generatePDF">
    <Icon name="ic:baseline-picture-as-pdf" size="24" />
  </button></ModuleTitle>
    <div class="max-h-[38rem] overflow-y-auto">
      <input v-model="query" type="text" class="w-full p-2" placeholder="Rechercher une ressource">
      <div class="max-h-[38rem] overflow-y-auto">
        <div v-if="res.length > 0">
          <Resource
            v-for="resource in res"
            :key="resource._id!.toString()"
            :resource="resource"
            :mode="'search'"
          />
        </div>
        <div v-else>
          <Teacher
            v-for="teacher in teacherStore.teachers"
            :key="teacher._id!.toString()"
            :teacher="teacher"
          />
        </div>
      </div>
    </div>
    <p class="text-right pr-4">Total heures: {{ totalHours }}h</p>
  </div>
</template>