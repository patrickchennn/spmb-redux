interface ShowBerkasProps{
  imgSrc: string,
  imgName: string
}
export default function ShowBerkas({imgSrc,imgName}: ShowBerkasProps){
  function handleZoomPicture(e: React.SyntheticEvent){
    const target = e.target as HTMLInputElement
    console.log("zoom in dah")
  }
  return (
    <>
      {
        imgSrc &&
        <div className='mb-3 d-flex justify-content-center'>
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