




const Wrapper = ({children}) => {

  return (
    <div style={{minHeight: "100vh", background: 'linear-gradient(black 10%, #820A05, #FA8681)', height:"100%", display: "flex", flexDirection:"column", justifyContent:"space-between"}}>
      { children }
    </div>
  )
}

export default Wrapper