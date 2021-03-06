import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component' 
import CartDropDown from '../cart-dropdown/cart-dropdown.component'

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({currentUser,hidden}) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo'></Logo>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/shop'>CONTACT</Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'></Link>
            }
            <CartIcon></CartIcon>
        </div>
        {
            hidden ? null :
            <CartDropDown />
        }
    </div>
)

const mapStateToProps = ({user:{currentUser},cart:{hidden}}) => ({
currentUser,hidden
});

export default connect(mapStateToProps)(Header);
//connect() da acceso a rootReducer, a la vez que este da acceso a user.reducer