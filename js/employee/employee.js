window.onload = function () {
  new employeePage();
};

class employeePage {
  pageTile = "Quản lý nhân viên ";
  constructor() {
    //thêm các button vào table
    this.initEvents();
    this.showLoading();
    this.loadData();
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
      // document
      //   .getElementById("row1-close-dialog")
      //   .addEventListener("click", this.btnCloseFrom);

      // ẩn from dialog dùng chung
      const buttons = document.querySelectorAll(
        "[mdialog] button.mdialog__button--close"
      );
      for (const button of buttons) {
        button.addEventListener("click", function () {
          this.parentElement.parentElement.parentElement.style.display = "none";
        });
      }
      // Thu gọn thanh Menu
      document
        .getElementById("btn-collapse")
        .addEventListener("click", this.btnCollapse);

      //click xóa nhân viên hiển thị thư mục thông báo
      // const buttonTables = document.querySelectorAll(".button-close-icon");
      // console.log(buttonTables);
      // for (const button of buttonTables) {
      //   button.addEventListener("click", this.btnDeleteEmployee.bind(this));
      //   console.log(button);
      // }

      //click đóng hoặc hủy thông báo xóa nhân viên
      // document
      //   .querySelector(".dialog-notice-close")
      //   .addEventListener("click", this.btnCloseNotice);
      document
        .querySelector(".btn-no")
        .addEventListener("click", this.btnCloseNotice);

      //Lưu dữ liệu
      document
        .querySelector("#btn-Save")
        .addEventListener("click", this.btnSaveOnClick.bind(this));
      //Click nút hủy trên from dialog
      document
        .querySelector("#btn-Cancel")
        .addEventListener("click", this.btnCancelOnClick);
    } catch (error) {
      console.error(error);
    }
  }
  //
  //Thực hiện loading trước khi tải xong dữ liệu
  //
  showLoading() {
    const loadingElement = document.querySelector(".m-loading");
    if (loadingElement) {
      loadingElement.style.display = "block";
    }
  }
  //
  //Thực hiển ấn loading sau khi dữ liệu đã tải xong
  //
  hideLoading() {
    const loadingElement = document.querySelector(".m-loading");
    if (loadingElement) {
      loadingElement.style.display = "none";
    }
  }
  //Dữ liệu nhân viên
  loadData() {
    try {
      // gọi API lấy dữ liệu
      fetch("/API/data/Employees.json").then((res) =>
        res.json().then((data) => {
          // Lấy ra table
          const table = document.querySelector("#data-table-id");
          // Duyệt từng phần tử trong data:
          let stt = 1;
          for (const item of data) {
            //Định dạng dữ liệu
            //Dữ liệu ngày tháng phải hiển thị là ngày/tháng/năm
            let identityDate = item.IdentityDate;
            if (identityDate) {
              identityDate = new Date(identityDate);
              let date = identityDate.getDate();
              date = date < 10 ? `0${date}` : date;
              let month = identityDate.getMonth() + 1;
              month = month < 10 ? `0${month}` : month;
              let year = identityDate.getFullYear();
              identityDate = `${date}/${month}/${year}`;
            }
            let tr = document.createElement("tr");
            tr.innerHTML = `<tr>
                <td>${stt}</td>
                <td>${item.EmployeeCode}</td>
                <td>${item.FullName}</td>
                <td>${item.GenderName}</td>
                <td class="text-align-center">${identityDate}</td>
                <td>${item.Email}</td>
                <td>${item.Address}
                <div class="button-container">
                <button class="button-table button-edit-icon m-btn-cursor"></button>
                <button class="button-table button-copy-icon m-btn-cursor"></button>
                <button class="button-table button-close-icon m-btn-cursor"></button>
                </div>
                </td>
              </tr>`;
            table.querySelector("tbody").append(tr);
            stt++;
          }
          // Gán sự kiện cho các nút sau khi chúng được thêm vào DOM
          const buttonTables = document.querySelectorAll(".button-close-icon");
          for (const button of buttonTables) {
            button.addEventListener("click", this.btnDeleteEmployee.bind(this));
          }
          this.hideLoading();
        })
      );
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
  //
  //click đóng thông báo xóa nhân viên sẽ hiển thị thông báo
  //
  btnSaveOnClick() {
    try {
      //Thực hiện validate dữ liệu
      const warning = this.validateData();
      //Hiển thị thông báo dữ liệu không hợp lệ
      if (warning.isValid === false) {
        let dialog = document.querySelector(".m-dialog-warning");
        //Hiển thị thông báo lên
        dialog.style.display = "block";
        //Thay đổi nội dung báo lỗi
        let warning_content = dialog.querySelector(
          ".dialog-warning-content .content-text"
        );
        warning_content.innerHTML = "";
        for (const msg of warning.Msg) {
          let li = document.createElement("li");
          li.textContent = msg;
          warning_content.append(li);
        }
        const dialog_warning = document.querySelector(
          ".dialog-warning-container"
        );
        const singleMessageHeight = 20;
        const totalHeight = warning.Msg.length * singleMessageHeight + 100;
        dialog_warning.style.height = totalHeight + "px";
      } else {
        //Dữ liệu hợp lệ hết thì gọi api thực hiện thêm mới
      }
    } catch (error) {
      console.error(error);
    }
  }
  validateData() {
    try {
      let warning = {
        isValid: false,
        Msg: [],
      };
      //Kiểm tra xem có mã nhân viên hay chưa ?
      const employeeCode = document.querySelector("#mnv").value;
      const fullName = document.querySelector("#hoten").value;
      const soCMT = document.querySelector("#cmt").value;
      const diDong = document.querySelector("#didong").value;
      const dtCoDinh = document.querySelector("#dtcodinh").value;
      const Email = document.querySelector("#email").value;
      if (
        employeeCode == "" ||
        employeeCode == null ||
        employeeCode == undefined
      ) {
        //Lưu thông tin lỗi
        warning.Msg.push("Mã nhân viên không được phép để trống.");
        document.querySelector("#mnv").style.borderColor = "red";
      } else {
        document.querySelector("#mnv").style.borderColor =
          "rgba(221, 221, 221, 0.911)";
      }

      if (fullName == "" || fullName == null || fullName == undefined) {
        //Lưu thông tin lỗi
        warning.Msg.push("Họ tên nhân viên không được phép để trống.");
        document.querySelector("#hoten").style.borderColor = "red";
      } else {
        document.querySelector("#hoten").style.borderColor =
          "rgba(221, 221, 221, 0.911)";
      }

      if (soCMT == "" || soCMT == null || soCMT == undefined) {
        //Lưu thông tin lỗi
        warning.Msg.push("Số chứng minh thư không được phép để trống.");
        document.querySelector("#cmt").style.borderColor = "red";
      } else {
        document.querySelector("#cmt").style.borderColor =
          "rgba(221, 221, 221, 0.911)";
      }

      if (diDong == "" || diDong == null || diDong == undefined) {
        //Lưu thông tin lỗi
        warning.Msg.push("Số di động không được phép để trống.");
        document.querySelector("#didong").style.borderColor = "red";
      } else {
        document.querySelector("#didong").style.borderColor =
          "rgba(221, 221, 221, 0.911)";
      }

      if (dtCoDinh == "" || dtCoDinh == null || dtCoDinh == undefined) {
        //Lưu thông tin lỗi
        warning.Msg.push("Số điện thoại cố định không được phép để trống.");
        document.querySelector("#dtcodinh").style.borderColor = "red";
      } else {
        document.querySelector("#dtcodinh").style.borderColor =
          "rgba(221, 221, 221, 0.911)";
      }
      if (Email == "" || Email == null || Email == undefined) {
        //Lưu thông tin lỗi
        warning.Msg.push("Email không được phép để trống.");
        document.querySelector("#email").style.borderColor = "red";
      } else {
        document.querySelector("#email").style.borderColor =
          "rgba(221, 221, 221, 0.911)";
      }

      if (warning.Msg.length === 0) {
        warning.isValid = true;
      }
      return warning;
    } catch (error) {
      console.error(error);
    }
  }
  //click nút hủy trên from thông tin nhân viên
  btnCancelOnClick() {
    try {
      const inputs = document.querySelectorAll(".m-dialog-content .row input");
      for (const input of inputs) {
        input.value = "";
        input.style.borderColor = "rgba(221, 221, 221, 0.911)";
      }
    } catch (error) {
      console.error(error);
    }
  }
}
