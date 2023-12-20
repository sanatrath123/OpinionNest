function Button ({
    children,
    type= "button",
    className= "",
    Bgcolor = "bg-Fuchsi-500",
    textColor = "text-white",
    ...props

})
{
   
    return (
        <button className={`py-2 px-3 rounded-lg ${Bgcolor} ${className} ${textColor}`}  {...props}>
          {children}
        </button>
    )
}

export default Button