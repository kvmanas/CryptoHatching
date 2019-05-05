<template>
  <div class="section section-navbars">
    <img src="/assets/img/path3.png" class="path">
    <div class="container" id="menu-dropdown">
      <div class="row">
        <div class="col-md-6">
          <h4>Menu</h4>
          <nav class="navbar navbar-expand-lg bg-primary">
            <div class="container">
              <a class="navbar-brand" href="#">Menu</a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#example-navbar"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
              <div class="collapse navbar-collapse" id="example-navbar">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">
                      <p>Link</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <p>Link</p>
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="http://example.com"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <p>Dropdown</p>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div class="col-md-6">
          <h4>Menu with Icons</h4>
          <nav class="navbar navbar-expand-lg bg-info">
            <div class="container">
              <a class="navbar-brand" href="#">Icons</a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#example-navbar-icons"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
              <div class="collapse navbar-collapse" id="example-navbar-icons">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <a class="nav-link" href="#pablo">
                      <i class="tim-icons icon-send" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#pablo">
                      <i class="tim-icons icon-single-02" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      href="#"
                      class="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                    >
                      <i class="tim-icons icon-settings-gear-63" aria-hidden="true"></i>
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <a class="dropdown-header">Dropdown header</a>
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                      <div class="divider"></div>
                      <a class="dropdown-item" href="#">Separated link</a>
                      <div class="divider"></div>
                      <a class="dropdown-item" href="#">One more separated link</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <h3 class="title mb-3">Navigation</h3>
    </div>
    <div id="navbar">
      <div class="navigation-example">
        <!-- Navbar Primary  -->
        <nav class="navbar navbar-expand-lg bg-primary">
          <div class="container">
            <div class="navbar-translate">
              <a class="navbar-brand" href="#pablo">Primary color</a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#example-navbar-primary"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse" id="example-navbar-primary">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#pablo">
                    <i class="tim-icons icon-world"></i> Discover
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="tim-icons icon-single-02"></i> Profile
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="tim-icons icon-settings-gear-63"></i> Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- End Navbar Primary -->
        <!-- Navbar Info -->
        <nav class="navbar navbar-expand-lg bg-info">
          <div class="container">
            <div class="navbar-translate">
              <a class="navbar-brand" href="#pablo">Info Color</a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#example-navbar-info"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse" id="example-navbar-info">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#pablo">Discover</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">Profile</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">Settings</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- End Navbar Info -->
        <!-- Navbar Success -->
        <nav class="navbar navbar-expand-lg bg-success">
          <div class="container">
            <div class="navbar-translate">
              <a class="navbar-brand" href="#">Success Color</a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#example-navbar-success"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse" id="example-navbar-success">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#pablo">
                    <i class="tim-icons icon-world"></i>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="tim-icons icon-single-02"></i>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="tim-icons icon-settings-gear-63"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- End Navbar Success -->
        <!-- Navbar Warning -->
        <nav class="navbar navbar-expand-lg bg-warning">
          <div class="container">
            <div class="navbar-translate">
              <a class="navbar-brand" href="#pablo">Warning Color</a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#example-navbar-warning"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse" id="example-navbar-warning">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="fab fa-facebook-square"></i>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="fab fa-google-plus"></i>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- End Navbar Warning -->
        <!-- Navbar Danger -->
        <nav class="navbar navbar-expand-lg bg-danger">
          <div class="container">
            <div class="navbar-translate">
              <a class="navbar-brand" href="#pablo">Danger Color</a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#example-navbar-danger"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse" id="example-navbar-danger">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="fab fa-facebook-square"></i> Share
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="fab fa-twitter"></i> Tweet
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="fab fa-pinterest"></i> Pin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- End Navbar Danger -->
        <!-- Navbar Transparent -->
        <nav class="navbar navbar-expand-lg navbar-transparent">
          <div class="container">
            <div class="navbar-translate">
              <a class="navbar-brand" href="#pablo">Transparent</a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#example-navbar-transparent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse" id="example-navbar-transparent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="fab fa-facebook-square"></i> Facebook
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="fab fa-twitter"></i> Twitter
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <i class="fab fa-instagram"></i> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- End Navbar Transparent-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Barracks"
};
</script>
