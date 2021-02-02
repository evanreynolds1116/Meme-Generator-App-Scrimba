import React, {useState, useEffect} from 'react'

function MemeGenerator() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg",
        allMemeImgs: []
    })

    const getMemeImgs = () => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const memes = response.data
                setMeme({...meme, allMemeImgs: memes})
            })
    }

    
    const handleChange = (event) => {
        const {name, value} = event.target
        setMeme({ ...meme, [name]: value })
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const memeImg = meme.allMemeImgs.memes[Math.floor(Math.random()*meme.allMemeImgs.memes.length)]
        setMeme({...meme, randomImg: memeImg.url})
    }
    
    useEffect(() => {
        getMemeImgs()
    }, [])
    
    return (
            <div>
                <form className="meme-form" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={meme.topText}
                        onChange={handleChange}
                    />

                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />

                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={meme.randomImg} alt="" />
                    <h2 className="top">{meme.topText}</h2>
                    <h2 className="bottom">{meme.bottomText}</h2>
                </div>
            </div>
        )
    
}

export default MemeGenerator