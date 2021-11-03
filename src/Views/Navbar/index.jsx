import React, {useContext, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Logo from '../../Assets/Logo.png';
import styles from './styles.module.scss';
import NCoin from '../../Assets/img/icon-ncoin.png';
import {useMediaQuery} from '../../Hooks/useMediaQuery';
import {UserData} from '../../Context/UserProvider';
import {separator} from '../../Utils/separator';
import authService from '../../Services/auth.service';
import Modal from '../../Global-Components/Modal';
import {logOutAmplitude, sendAmplitudeData} from '../../Utils/amplitude';
import ReloadForte from './components/ReloadForte';

const NavBar = () => {
  const FORTE_REDIRECT = process.env.REACT_APP_FORTE_REDIRECT_PAYLOAD;
  const FORTE_LOGIN_URL = process.env.REACT_APP_FORTE_LOGIN_URL;
  const [menu, setMenu] = useState (false);
  const [coins, setCoins] = useState ();
  const [dropdown, setDropdown] = useState (false);
  const [modal, setModal] = useState (false);
  const [modal2, setModal2] = useState (false);

  const history = useHistory ();
  const {userData, setPreviousNav, setCoin} = useContext (UserData);
  const [countReload, setCountReload] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(false);

  let responsive = useMediaQuery ('(min-width: 1200px)');

  useEffect (
    () => {
      if (!responsive) setMenu (false);
    },
    [responsive]
  );

  useEffect (
    () => {
      let response;
      const fetchData = async () => {
        setLoadingBalance(true);
        response = await authService.getForteBalance (userData);
        if (response.error.text.includes ('authorized')) {
          alert ('Session expired, please login again.');
          localStorage.removeItem ('user');
          history.push ('/');
          window.location.reload ();
        }
        if (countReload > 3) setCountReload(0);
        setCoins (separator (response.coin));
        setCoin (response.coin);
        setLoadingBalance(false)
        
      };
      userData.email && fetchData ();
    },
    [userData, setCoin, history, countReload]
  );

  const onClick = e => {
    setMenu (!menu);
    setDropdown (!dropdown);
  };

  const comingSoon = () => {
    setMenu (!menu);
    setModal (true);
  };

  const comingSoon2 = () => {
    setMenu (!menu);
    setModal2 (true);
  };

  const logout = () => {
    localStorage.removeItem ('user');
    logOutAmplitude ();
    history.push ('/');
    window.location.reload ();
  };

  const previousMenu = async link => {
    await setPreviousNav (link);
    return;
  };

  const handleFortePayload = async () => {
    let site = 'Buy More';
    const properties = {
      clicked: site,
      page: site,
    };
    sendAmplitudeData ('Click', properties);
    const response = await authService.getFortePayload (userData);
    console.log (response);
    if (response.error.text !== '') {
      if (response.error.text.includes ('authorized')) {
        alert ('Session expired, please login again.');
        logout ();
      } else {
        alert (response.error.text);
      }
    } else {
      setCountReload(countReload + 1)
      if (response.linked === false) {
        window.open (`${FORTE_REDIRECT}/${response.payload}`);
      } else {
        window.open (FORTE_LOGIN_URL);
      }
    }
  };

  const reloadForte = () => {
    setCountReload(countReload + 1)
  }

  return (
    <header className={menu === true ? styles.header : ''}>
      <nav className={styles.navbar}>

        <Link to="/">
          <img src={Logo} alt="Battle Palooza" />
        </Link>

        <div className={styles.links}>
          <ul
            className={
              menu && !responsive ? styles.navMenuActive : styles.navMenu
            }
          >
            <div className={styles.navLinks}>

              {/* <li onClick={() => previousMenu ('/packs')}>
                <span
                  onClick={comingSoon}
                  href
                  // to={userData.email ? '/packs' : '/needLogin'}
                  className={styles.navLink}
                >
                  PACKS
                </span>
              </li> */}
              <li onClick={() => previousMenu ('/marketplace')}>
                <a
                  href
                  onClick={comingSoon}
                  to={userData.email ? '/marketplace' : 'needlogin'}
                  className={styles.navLink}
                >
                  MARKETPLACE
                </a>
              </li>
              <li>
                <a
                  href="https://www.battlepalooza.com/news/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLink}
                >
                  NEWS
                </a>
              </li>
              <li>
                <a
                  onClick={() => setMenu (!menu)}
                  href="https://nway.helpshift.com/a/battlepalooza/?p=web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLink}
                >
                  HELP
                </a>
              </li>
              {userData.email
                ? <li className={styles.collection}>
                    <li
                      onClick={
                        comingSoon2
                      } /* onClick={() => setDropdown (!dropdown)} */
                    >
                      COLLECTION
                    </li>
                    {/* {dropdown &&
                      <div className={styles.dropdown}>
                        <Link onClick={onClick} to="/my-packs">
                          MY PACKS
                        </Link>
                        <Link onClick={onClick} to="/my-skins">
                          MY SKINS
                        </Link>
                      </div>} */}

                  </li>
                : null}

              {userData.email
                ? <li onClick={() => logout ()} className={styles.logout}>
                    LOG OUT
                  </li>
                : null}
            </div>

            <div className={styles.cont}>
              {userData.email
                ? <div className={styles.bottomContainer}>
                    <button onClick={handleFortePayload}>BUY MORE</button>
                    <div className={styles.bottom}>
                      <div className={styles.user}>
                        <p className={styles.name}>{userData.email}</p>
                        <Link
                          className={styles.link}
                          onClick={() => setMenu (!menu)}
                          to="/account"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.1929 10.535C17.2315 10.2365 17.2835 9.9399 17.2835 9.63175C17.2835 9.32167 17.2295 9.02699 17.1929 8.72847L18.9282 7.41496C19.3153 7.12221 19.4232 6.58679 19.1805 6.16501L17.6224 3.46674C17.3798 3.04688 16.8617 2.87161 16.4148 3.06036L14.4176 3.902C13.9304 3.53029 13.4123 3.20288 12.8403 2.96406L12.5745 0.843572C12.5148 0.362081 12.1045 0 11.6192 0H8.50491C8.01957 0 7.60934 0.362081 7.54963 0.843572L7.28385 2.96406C6.71184 3.20288 6.19183 3.53222 5.70649 3.902L3.70926 3.06036C3.26244 2.87161 2.74435 3.04495 2.50168 3.46674L0.943579 6.16501C0.700908 6.58487 0.808762 7.12029 1.19588 7.41496L2.93117 8.72847C2.89266 9.02699 2.84065 9.32359 2.84065 9.63175C2.84065 9.94183 2.89458 10.2365 2.93117 10.535L1.19588 11.8485C0.808762 12.1413 0.700908 12.6767 0.943579 13.0985L2.50168 15.7968C2.74435 16.2166 3.26244 16.3919 3.70926 16.2031L5.70649 15.3596C6.19376 15.7313 6.71184 16.0587 7.28385 16.2975L7.54963 18.418C7.60934 18.8995 8.01957 19.2616 8.50491 19.2616H11.6192C12.1045 19.2616 12.5148 18.8995 12.5745 18.418L12.8403 16.2975C13.4123 16.0587 13.9323 15.7293 14.4176 15.3596L16.4148 16.2012C16.8617 16.39 17.3798 16.2166 17.6224 15.7948L19.1805 13.0966C19.4232 12.6767 19.3153 12.1413 18.9282 11.8466L17.1929 10.535ZM10.0611 13.4817C7.9329 13.4817 6.20916 11.758 6.20916 9.62982C6.20916 7.50163 7.9329 5.77789 10.0611 5.77789C12.1893 5.77789 13.913 7.50163 13.913 9.62982C13.913 11.758 12.1893 13.4817 10.0611 13.4817Z"
                              fill="#FFDD00"
                            />
                          </svg>
                        </Link>
                      </div>
                      <div className={styles.ncoins}>
                        <p>{coins} NCoins </p>
                        <img src={NCoin} alt="NCoin" />
                        {countReload ?
                        <ReloadForte
                        handleClick = {reloadForte}
                        clase = {loadingBalance ? "reload" : "normal"}
                        />
                        : null
                      }
                      </div>
                    </div>
                  </div>
                : <div className={styles.btns}>
                    <Link onClick={() => setMenu (!menu)} to="/login">
                      <button className={styles.login}>LOGIN</button>
                    </Link>
                    <Link onClick={() => setMenu (!menu)} to="/signup">
                      <button className={styles.signUp}>SIGN UP</button>
                    </Link>
                  </div>}
            </div>
          </ul>

        </div>

        <div className={styles.btnContainer}>
          {userData.email
            ? <div className={styles.userData}>
                <div className={styles.flex}>
                  <div className={styles.dataContainer}>
                    <div className={styles.user}>
                      <p>Welcome, {userData.email}</p>
                      <Link
                        className={styles.link}
                        onClick={() => setMenu (!menu)}
                        to="/account"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.1929 10.535C17.2315 10.2365 17.2835 9.9399 17.2835 9.63175C17.2835 9.32167 17.2295 9.02699 17.1929 8.72847L18.9282 7.41496C19.3153 7.12221 19.4232 6.58679 19.1805 6.16501L17.6224 3.46674C17.3798 3.04688 16.8617 2.87161 16.4148 3.06036L14.4176 3.902C13.9304 3.53029 13.4123 3.20288 12.8403 2.96406L12.5745 0.843572C12.5148 0.362081 12.1045 0 11.6192 0H8.50491C8.01957 0 7.60934 0.362081 7.54963 0.843572L7.28385 2.96406C6.71184 3.20288 6.19183 3.53222 5.70649 3.902L3.70926 3.06036C3.26244 2.87161 2.74435 3.04495 2.50168 3.46674L0.943579 6.16501C0.700908 6.58487 0.808762 7.12029 1.19588 7.41496L2.93117 8.72847C2.89266 9.02699 2.84065 9.32359 2.84065 9.63175C2.84065 9.94183 2.89458 10.2365 2.93117 10.535L1.19588 11.8485C0.808762 12.1413 0.700908 12.6767 0.943579 13.0985L2.50168 15.7968C2.74435 16.2166 3.26244 16.3919 3.70926 16.2031L5.70649 15.3596C6.19376 15.7313 6.71184 16.0587 7.28385 16.2975L7.54963 18.418C7.60934 18.8995 8.01957 19.2616 8.50491 19.2616H11.6192C12.1045 19.2616 12.5148 18.8995 12.5745 18.418L12.8403 16.2975C13.4123 16.0587 13.9323 15.7293 14.4176 15.3596L16.4148 16.2012C16.8617 16.39 17.3798 16.2166 17.6224 15.7948L19.1805 13.0966C19.4232 12.6767 19.3153 12.1413 18.9282 11.8466L17.1929 10.535ZM10.0611 13.4817C7.9329 13.4817 6.20916 11.758 6.20916 9.62982C6.20916 7.50163 7.9329 5.77789 10.0611 5.77789C12.1893 5.77789 13.913 7.50163 13.913 9.62982C13.913 11.758 12.1893 13.4817 10.0611 13.4817Z"
                            fill="#FFDD00"
                          />
                        </svg>
                      </Link>
                    </div>
                    <div className={styles.ncoins}>
                      <p>{coins} NCoins</p>
                      <img src={NCoin} alt="NCoin" />
                      {countReload ?
                        <ReloadForte
                        handleClick = {reloadForte}
                        clase = {loadingBalance ? "reload" : "normal"}
                        />
                        : null
                      }
                    </div>
                      <button className={styles.buyMore} onClick={handleFortePayload}>BUY MORE</button>
                  </div>

                </div>
                <li onClick={() => logout ()} className={styles.logoutBtn}>
                  LOGOUT
                </li>
              </div>
            : <div>
                <Link to="/login">
                  <button className={styles.login}>LOGIN</button>
                </Link>
                <Link to="/signup">
                  <button className={styles.signUp}>SIGN UP</button>
                </Link>
              </div>}

        </div>

        <div
          className={menu === true ? styles.hamburgerActive : styles.hamburger}
          onClick={e => onClick (e)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>
      </nav>
      {modal &&
        <div className={styles.modalContainer}>
          <Modal
            style={{height: '250px'}}
            title="COMING SOON..."
            handleClose={() => setModal (false)}
          />
        </div>}
      {modal2 &&
        <div className={styles.modalContainer}>
          <Modal
            style={{height: '250px'}}
            title="PREPARING..."
            handleClose={() => setModal2 (false)}
          />
        </div>}
    </header>
  );
};

export default NavBar;
