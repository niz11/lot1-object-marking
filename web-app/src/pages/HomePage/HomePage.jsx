import "./homepage.style.css";

function HomePage(props) {

    function smoothScroll(obj)
    {
        if (window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && window.location.hostname == this.hostname) {
            let target = (this.hash);
            target = target.length ? target : ('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                ('html, body').animate({
                    scrollTop: (target.offset().top - 54)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    }
    return (
        <>
            <header className="masthead">
                    <div className="container">
                        <div className="intro-text">
                            <div className="intro-lead-in">Welcome To Our Web AR Studio!</div>
                            <div className="intro-heading text-uppercase">We develop astonishing web Ar's for your Arts</div>
                            <a onClick={smoothScroll} className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Tell
                                Me More</a>
                        </div>
                    </div>
            </header>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href="#">Web-AR-Studio</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                            data-target="#navbar1" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        Menu
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbar1">

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#about">About</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Services</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default HomePage;
