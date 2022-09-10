interface ShowBerkasProps{
  imgSrc: string,
  imgName: string
}
export default function ShowBerkas({imgSrc,imgName}: ShowBerkasProps){
  function handleZoomPicture(e: React.SyntheticEvent){
    const target = e.target as HTMLInputElement
    console.log("zoom in dah")
  }
  // console.log(imgName)
  return (
    <>
      {
        imgSrc &&
        <div className='d-flex justify-content-center'>
          <img 
            onClick={handleZoomPicture} 
            style={{cursor:"zoom-in"}} 
            src={imgSrc}
            width="50%" 
            height="50%" 
            alt={imgName} />
        </div>
      }
    </>
  )
}