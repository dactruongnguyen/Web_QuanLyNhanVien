window.onload = function () {
  new employeePage();
};

class employeePage {
  pageTile = "Quản lý nhân viên ";
  constructor() {
    //thêm các button vào table
    this.addBtnTable();
    this.initEvents();
  }

  /*
Khởi tạo các sự kiện trong page
Nguyễn Đắc Trường
*/
  initEvents() {
    try {
      //click hiển thị thêm from mới
      document
        .getElementById("btn-themmoi")
        .addEventListener("click", this.btnThemMoi);
      //refresh

      document
        .getElementById("btn-refresh")
        .addEventListener("click", this.btnRefresh);
      //xuất khẩu
      //xóa bản ghi

      // Ẩn from thông tin nhân viên
      document
        .getElementById("row1-close-dialog")
        .addEventListener("click", this.btnCloseFrom);

      // Thu gọn thanh Menu
      document
        .getElementById("btn-collapse")
        .addEventListener("click", this.btnCollapse);

      //click xóa nhân viên hiển thị thư mục thông báo
      document.querySelectorAll(".button-close-icon").forEach((button) => {
        button.addEventListener("click", this.btnDeleteEmployee);
      });

      //click đóng thông báo xóa nhân viên
      document
        .querySelector(".dialog-notice-close")
        .addEventListener("click", this.btnCloseNotice);
    } catch (error) {
      console.error(error);
    }
  }
  loadData() {}

  //
  //Thêm các button vào cuối cột table
  //
  addBtnTable() {
    try {
      const table = document.getElementById("data-table-id");
      const rows = table.getElementsByTagName("tr");
      for (let i = 1; i < rows.length; i++) {
        // Bỏ qua hàng tiêu đề
        const cell = rows[i].cells[rows[i].cells.length - 1]; // Chọn cột cuối cùng
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        //tạo khối button
        const editButton = document.createElement("button");
        editButton.className = "button-table button-edit-icon m-btn-cursor";
        const copyButton = document.createElement("button");
        copyButton.className = "button-table button-copy-icon m-btn-cursor";
        const closeButton = document.createElement("button");
        closeButton.className = "button-table button-close-icon m-btn-cursor";

        //thêm các button vào bên trong thẻ div
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(copyButton);
        buttonContainer.appendChild(closeButton);
        cell.appendChild(buttonContainer);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //
  //Click nú thêm mới
  //
  btnThemMoi() {
    try {
      //1. Lấy ra element của from thông tin nhân viên
      const dialog = document.getElementById("from-dialog");
      //2. Set hiển thị from
      dialog.style.display = "block";
    } catch (error) {
      console.error(error);
    }
  }

  //
  //Click nút refresh
  //
  btnRefresh() {
    try {
    } catch (error) {
      console.error(error);
    }
  }
  //
  //Click nút x trên from
  //
  btnCloseFrom() {
    try {
      //Lấy element của from thông tin nhân viên
      const dialog = document.getElementById("from-dialog");
      //2 set ẩn from
      dialog.style.display = "none";
    } catch (error) {
      console.error(error);
    }
  }

  //
  //click nút thu gọn
  //
  btnCollapse() {
    try {
      //Lấy element của Menu
      const menu = document.querySelector(".menu");
      const navbar = document.getElementById("navbar-id");
      const btnCollapse = document.getElementById("btn-collapse");
      if (menu.style.display === "none") {
        // Mở rộng menu
        menu.style.display = "block";
        navbar.style.width = "200px"; // Kích thước ban đầu của navbar
        btnCollapse.textContent = "Thu Gọn";
      } else {
        // Thu gọn menu
        menu.style.display = "none";
        navbar.style.width = "16px";
        btnCollapse.textContent = ">>";
      }
    } catch (error) {
      console.error(error);
    }
  }

  //
  //click xóa nhân viên sẽ hiển thị thông báo
  //
  btnDeleteEmployee() {
    try {
      //Lấy element của thông báo xóa nhân viên
      const notice = document.querySelector(".m-dialog-notice");
      // set hiện thông báo
      notice.style.display = "block";
    } catch (error) {
      console.error(error);
    }
  }
  //
  //click đóng thông báo xóa nhân viên sẽ hiển thị thông báo
  //
  btnCloseNotice() {
    try {
      //Lấy element của thông báo xóa nhân viên
      const notice = document.querySelector(".m-dialog-notice");
      // set ấn thông báo
      notice.style.display = "none";
    } catch (error) {
      console.error(error);
    }
  }
}
