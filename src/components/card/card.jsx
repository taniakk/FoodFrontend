import './card.css'

function Cards({img,heading,para,he,wi,borderRad ,bodywi}) {
    return(
        <>
        <div  style={{
            
            width:bodywi,
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            margin:"auto"
        }}>

        
        <div className="cardComponentcontain" style={{height:he,width:wi ,backgroundImage:`url(${img})`,backgroundSize:"100% 100%",        
        borderRadius:`${borderRad}`
    }}>
            {/* <img src={img} alt="" srcset="" height={'200px'} width={'100%'} className='myCarImg' /> */}
                <p>{para}</p>
               
        </div>
                <h4 style={{textShadow:".5px .5px  1px gray", marginLeft:"18px",color:"black",fontSize:'18px',marginTop:'8px'}}>{heading}</h4>
                </div>
        </>
    )
}

export default Cards