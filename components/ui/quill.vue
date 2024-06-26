<template>
    <QuillEditor :options="editorOptions" contentType="html"/>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  
  ['bold', 'italic', 'underline', 'link'],             // ['bold', 'italic', 'underline', 'strike'],   // toggled buttons
  // ['blockquote', 'code-block'],
  // ['link', 'image', 'video', 'formula'],
  // [{ 'header':  1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],        // [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  // [{ 'direction': 'rtl' }],                         // text direction
  // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  // [{ 'font': [] }],
  // [{ 'align': [] }],
  ['clean']                                         // remove formatting button
];

const editorOptions = {
  modules: {
      toolbar: toolbarOptions,
  },
  placeholder: 'Insert text here ...',
  theme: 'snow',
  readOnly: false,
};
</script>
