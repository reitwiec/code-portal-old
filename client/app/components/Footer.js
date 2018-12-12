import React, { Component } from 'react';
import styled from 'styled-components';

class Footer extends Component {
    render() {
        return (
             <footer className={this.props.className} ><div>❤️ IECSE Manipal ©</div></footer>
        );
    }
}

export default styled(Footer)`
    div{
        font-size:0.8em;
        line-height:40px;
        text-align:center;
        color:#373d5d;
    }
`;