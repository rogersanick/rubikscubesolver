import React from 'react'
import { useForm } from 'react-hook-form'

export default function FancyForm(props) {
  const { register, handleSubmit, errors } = useForm()

  let readMembers = ""
  let writeMembers = ""
  let owners = ""

  function update(newVal) {
    
  }

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
      <label>Read Group Members</label>
      <input name="readMembers" ref={register} value={readMembers}/>
      <label>Write Group Members</label>
      <input name="writeMembers" ref={register} value={writeMembers}/>
      <label>Owners</label>
      <input name="owners" value = {owners} ref={register({ required: true })} />
    

      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>At least one owner is required</span>}

      <button type="submit">Submit</button>
    </form>
  )
}