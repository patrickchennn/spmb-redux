interface VisiMisiProps{
  pilihanProdi: string
}
const visiMisi = {
  ilmuTeologi:{
    visi:"hahaha h ahahah aahahahahaahahaahahaha hahahahaahaahahaahah ahaahahhahah ahahahahaah ahahaha aha haaha hahahahah ahaaha  aha haahahaha ahahhah ahahahah ahaahahaha haaha haahahah ahahah ahaa haahahaa hahahaahah", 
    misi:"hh hihihihi hihihih ih ih ihhhhihihihihihihihih ihihhhhihihihihihihihihihihhhh ihihihihihihi hihih ihhhhi hihihih ih ihi hihihihhhhihihihihih ihihihihi hhhhihihi hihihihihihi hihhhhihihihihihih  ihi hihihhh hihihihihihihihi  hihihhh hihihih ihih ihihihihihh hhihihihihihihihi hihihhhhihih  ihihihihihihihih",
  },
  ilmuFilsafat:{
    visi:"hohoh ohohohohoohohoho hoohohoohohohohohohohoohoohohoo hohohoohohhohoho hohoh ohoohohohoho ohohooh ohohohoh ohohoohoohohoohohohoo hohhohohohohohoh oohohohohoohohoohohohohohohohooh oohohoohohohoohoh",
    misi:"hehehehehehehee  heheheheeheheehe heheheheheheeh eeheheeheheheehehhe hehehehehehe eheh  eheheeheheeh  ehehehehe heheehe eheheeh eheheehe hhehehe heheheh eehe heheheehe  heehehehehehe  hehee heeheheeh eheheeheh"
  },
  teknikInformatika:{
    visi:"Quod modus dissentias nam id. Est ut unum vulputate mediocritatem. Eu animal aliquam pro, vim te tacimates atomorum. Erat gubergren mea ne, ea tale purto impetus quo.Te nihil decore sea. Nemore cetero eum id, usu eu inermis fastidii instructior, ius ei diam mundi nostrum. Iudico dolore offendit ea nec, pro in ridens sensibus, vix maluisset aliquando in. Alienum splendide gloriatur duo at, tibique sapientem cu mel.",
    misi:"Quod modus dissentias nam id. Est ut unum vulputate mediocritatem. Eu animal aliquam pro, vim te tacimates atomorum. Erat gubergren mea ne, ea tale purto impetus quo.Te nihil decore sea. Nemore cetero eum id, usu eu inermis fastidii instructior, ius ei diam mundi nostrum. Iudico dolore offendit ea nec, pro in ridens sensibus, vix maluisset aliquando in. Alienum splendide gloriatur duo at, tibique sapientem cu mel."
  }
}

export default function VisiMisi({pilihanProdi}: VisiMisiProps){
  let visi: string="-",misi: string="-"
  if(pilihanProdi==="Ilmu Teologi"){
    visi=visiMisi.ilmuTeologi.visi
    misi=visiMisi.ilmuTeologi.misi
  }else if(pilihanProdi==="Ilmu Filsafat"){
    visi=visiMisi.ilmuFilsafat.visi
    misi=visiMisi.ilmuFilsafat.misi
  }else if(pilihanProdi==="Teknik Informatika"){
    visi=visiMisi.teknikInformatika.visi
    misi=visiMisi.teknikInformatika.misi
  }

  return (
    <div>
      <h5>Visi & Misi Jurusan {pilihanProdi}</h5>
      <div>
        <h6 className="text-secondary">Visi</h6>
        <p>{visi}</p>
      </div>
      <div>
        <h6 className="text-secondary">Misi</h6>
        <p>{misi}</p>
      </div>
    </div>
  )
}

/*
fil
Quod modus dissentias nam id. Est ut unum vulputate mediocritatem. Eu animal aliquam pro, vim te tacimates atomorum. Erat gubergren mea ne, ea tale purto impetus quo.Te nihil decore sea. Nemore cetero eum id, usu eu inermis fastidii instructior, ius ei diam mundi nostrum. Iudico dolore offendit ea nec, pro in ridens sensibus, vix maluisset aliquando in. Alienum splendide gloriatur duo at, tibique sapientem cu mel.

theo
Id usu prima diceret consulatu. Ut esse albucius accusata mei. Eu est nostrum temporibus. Ei augue expetendis intellegebat mea, elaboraret persequeris ea sit, elaboraret voluptatibus vix ad. Illud harum audiam mel ea, ius ne ocurreret sententiae, brute commune qui at. Has ludus saepe neglegentur ne, eos cibo consul ut. Case apeirian constituam ne sea, ferri explicari et per.

cs
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi totam sequi autem est necessitatibus, illo non et, quibusdam excepturi atque enim officia sapiente id tenetur mollitia. Iusto minima quam a similique laborum fugiat repudiandae consequuntur vitae ad temporibus dicta tempore, dolorem dolore recusandae cupiditate id porro quasi facere cum doloremque?
*/