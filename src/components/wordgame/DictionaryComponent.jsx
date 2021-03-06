import React, { Component } from 'react'

export default class ScrabbleComponent extends Component {
    constructor(){
        super()
        this.state = {
            words_starts_with_ltr : {},
            words : '',
            alphabets : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        }
    }
    
    filterWords = (e) => {
        this.setState( {
            words_starts_with_ltr : this.state.words.filter((item) => (item.word.startsWith(e.target.name)))
        })
    }

    componentDidMount =() =>{
        this.getMoviesFromApiAsync()
    }

    getMoviesFromApiAsync = () => fetch('https://sanjeevchougala.github.io/DataInputs//words-list-dictionary.json')
    .then((response) => response.json())
    .then((responseJson) => { console.log(responseJson)
       this.setState({ words : responseJson });
    })
    .catch((error) => {
       console.error(error);
    })

    render() {
        return (
            <div>
                <button className="btn btn-info btnfullwindowwidth" name= "copyrtmessage" onClick={ () => {this.setState({showcopyrightmsg : !this.state.showcopyrightmsg})}}>copyright message</button>
               
               { this.state.showcopyrightmsg && <div className='container-info'> 
                   <span> Words and definitions soruced from WebstersDictionary on GitHub
                           Copyright 2018 Vivian Silva

                           Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

                           The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

                           THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                   </span>
               </div>
               }
                <div>
                    <br/>
                </div>
                {this.state.alphabets.map(ltr => <button className="btn btn-info aplhaBtn" name= {ltr} onClick={this.filterWords}>{ltr}</button>)}

                <table className='table table-striped table-bordered table-sm'>
                    <thead className='table-dark'>
                        <td>Word</td>
                        <td>Type</td>
                        <td>Definition</td>
                    </thead>
                    <tbody>
                            {this.state.words_starts_with_ltr.length && this.state.words_starts_with_ltr.map((w) => <tr><td>{w.word}</td> <td>{w.pos}</td> <td>{w.definitions}</td></tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}
