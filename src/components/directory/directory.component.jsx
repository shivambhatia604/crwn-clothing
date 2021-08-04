import React from 'react';
// import { render } from 'react-dom';
import MenuItem from '../menu-item/menu-items.component';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectDirectorySections} from '../../redux/directory/directory.selectors.js';

import './directory.styles.scss';

const Directory = ({sections}) =>(

            <div className='directory-menu'>
            {
                sections.map(({id,...otherSectionProps}) => (
                    <MenuItem key={id} {...otherSectionProps}/>
                ))
            }
            </div>
        );

const mapStateToProps = createStructuredSelector({
    sections:selectDirectorySections
});


export default connect(mapStateToProps)(Directory);