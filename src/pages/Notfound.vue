<template>
  <div>
    <Navbar />

    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <h1 class="mt-4">Không tìm thấy yêu cầu!</h1>
          <hr>

          <!-- Date/Time -->
          <router-link :to="{name: 'Dashboard'}">
            Nhấn vào đây để quay về trang chủ
          </router-link>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">

          <!-- Search Widget -->
          <div class="card my-4">
            <h5 class="card-header">Tìm kiếm</h5>
            <div class="card-body">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Nhập từ khoá...">
                <span class="input-group-btn">
                  <button class="btn btn-secondary" type="button">Tìm</button>
                </span>
              </div>
            </div>
          </div>

          <!-- Categories Widget -->
          <div class="card my-4">
            <h5 class="card-header">Nhãn</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#">Web Design</a>
                    </li>
                    <li>
                      <a href="#">HTML</a>
                    </li>
                    <li>
                      <a href="#">Freebies</a>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#">JavaScript</a>
                    </li>
                    <li>
                      <a href="#">CSS</a>
                    </li>
                    <li>
                      <a href="#">Tutorials</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Side Widget -->
          <div class="card my-4">
            <h5 class="card-header">Thông báo!</h5>
            <div class="card-body">
              Chào mừng bạn abcxyz!!!
            </div>
          </div>

        </div>
      </div>
    </div>

    <Footerr />
  </div>
</template>
<script>
  export default {
    data () {

    }
  }
</script>
