import clsx from "clsx";

const isPrimary = true

const classes = clsx(['btn','btn-primary',isPrimary && 'active'])



const isdisable = false
const classes2 = clsx({
  btn:true,
  'btn-primary':isPrimary,
  'btn-disaled':isdisable
})