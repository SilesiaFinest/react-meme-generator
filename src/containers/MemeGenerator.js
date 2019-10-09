import React, { Component } from 'react';
// state declaration
class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: '',
            bottomText: '',
            randomImage: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        }
    }
// componentDM to fetch data asap, then received data to be .json()
// then deconstruct = ( extract memes array from data object)
// save that array to allMemeImgs - empty array declared in state above
    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })
            })
    }
// handle change in text input fields - deconstruct for name and value
// top and bottom text name and update the state
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value})
    }
// default button function in <form> is to submit =  preventDefault would stop reloading the page
// create a random number and use is a [index] of memes in array allMemesImgs
// extract .url of that random img and update the state with new url address
    handleSubmit = (event) => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImage: randMemeImg })
    }

    render() {
        return (
            <div>
                <form className='meme-form' onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        name='topText'
                        placeholder='Top Text'
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input
                        type='text'
                        name='bottomText'
                        placeholder='Bottom Text'
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>GEN</button>
                </form>
                <div className='meme'>
                    <img src={this.state.randomImage} alt='' />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;