import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"

function RTE({name ,label, control , defaultValue=""}) {
  return (
    <div className="w-full">
    {label && <label className="inline-block mb-2 p-1 ">{label}</label>}
    <Controller
 name={name || "content"}
 control={control}
    render={({ field: { onChange } }) => (
  <Editor
  apiKey='fi6bnmm7pgknz5kcv6195n9aashpuewlkmfjx9pwkenco6kf'
          initialValue= {defaultValue}
         init={{
          
           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: ['undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help'],
           content_style: ['body { font-family:Helvetica,Arial,sans-serif; font-size:14px }']
         }}
         onEditorChange={onChange}
       />

       )}
    

    
    />  
    </div>
  )
  
}

export default RTE



