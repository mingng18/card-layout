import React from 'react'
import { Columns, Grid } from "react-feather";
import './style.scss'

type Props = {
    toggleView: (view: boolean) => void;
    view: boolean;
}

export default function Header ({ view, toggleView }: Props) {
    return(
        <header className="header-container">
            <button className='custom-button' onClick={() => toggleView(!view)}>
                {view ? <Columns  /> : <Grid />} 
            </button>
        </header>
    );
}