interface ShowBerkasProps{
  selectedProperty: Blob | null
}
export default function ShowBerkas({selectedProperty}: ShowBerkasProps){
  function handleZoomPicture(e: React.SyntheticEvent){
    const target = e.target as HTMLInputElement
    console.log("zoom in dah")
  }
  return (
    <>
      {
        selectedProperty &&
        <div className='d-flex justify-content-center'>
          <img onClick={handleZoomPicture} style={{cursor:"zoom-in"}} src={`${selectedProperty}`} width="50%" height="50%" alt="foto copy kartu keluarga" />
        </div>
      }
    </>
  )
}