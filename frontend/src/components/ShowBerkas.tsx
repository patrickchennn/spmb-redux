interface ShowBerkasProps{
  selectedImage: Blob | null
}
export default function ShowBerkas({selectedImage}: ShowBerkasProps){
  return (
    <>
      {
        selectedImage &&
        <div className='my-2 d-flex justify-content-center'>
          <img src={`${selectedImage}`} width="150px" height="150px" alt="foto copy kartu keluarga" />
        </div>
      }
    </>
  )
}