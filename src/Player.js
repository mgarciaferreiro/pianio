import WebFont from 'webfontloader'
import React, { useState, useEffect } from 'react'
import minnie from './images/minnie.png'
import mickey from './images/mickey.png'
import donald from './images/donald.png'
import goofy from './images/goofy.png'
import tom from './images/tom.png'
import berlioz from './images/berlioz.png'

const images = {minnie, mickey, donald, goofy, tom, berlioz}

function Player({player}) {

    return (
        <div>
            <img className="profileSidePic" src={images[player.character]} alt="profile picture" />
        </div>
    )

}

export default Player