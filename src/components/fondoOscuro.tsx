interface props{
    vista:boolean
}

export default function FondoOscuro({ vista }:props){
    return (
        <div
            id="fondoOscuro" 
            className={`${!vista && "hidden"} absolute h-full w-full bg-black opacity-50 z-[90]`}>
        
        </div>
    )
}