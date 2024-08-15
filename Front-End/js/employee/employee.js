window.onload = function () {
  new employeePage();
};

class employeePage {
  pageTile = "Quản lý nhân viên ";
  fromMode = "save";
  employeeIdForUpdate = null;
  employeeIdForDelete = null;
  constructor() {
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

      //Ẩn from thông tin nhân viên
      document
        .getElementById("row1-close-dialog")
        .addEventListener("click", this.btnCloseFrom);

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
      //click nút Có ở thông báo xóa nhân viên
      document
        .querySelector(".btn-yes")
        .addEventListener("click", this.btnYes.bind(this));
      //click nút search theo mã, họ tên
      document
        .querySelector(".table-header-left .m-icon-search")
        .addEventListener("input", this.selectEmployee.bind(this));
      document
        .querySelector("#btn-refresh")
        .addEventListener("click", this.loadData.bind(this));
      //Phân trang :
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
      this.showLoading();
      // gọi API lấy dữ liệu
      fetch("https://cukcuk.manhnv.net/api/v1/Employees").then((res) =>
        res.json().then((data) => {
          // Lấy ra table
          const table = document.querySelector("#data-table-id");
          const tbody = table.querySelector("tbody");
          tbody.innerHTML = ""; // Xóa dữ liệu cũ trong tbody
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
            tr.dataset.entity = JSON.stringify(item);
            table.querySelector("tbody").append(tr);
            stt++;
          }
          // Gán sự kiện cho các nút sau khi chúng được thêm vào DOM
          //1. Gán sự kiện nút close
          const buttonTableClose =
            document.querySelectorAll(".button-close-icon");
          for (const button of buttonTableClose) {
            button.addEventListener("click", this.btnDeleteEmployee.bind(this));
          }
          //2. Gán sự kiện nút chỉnh sửa
          const buttonTableEdit =
            document.querySelectorAll(".button-edit-icon");
          for (const button of buttonTableEdit) {
            button.addEventListener("click", (event) =>
              this.btnEditEmployee(event)
            );
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
      this.fromMode = "save";
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
      //2. đặt toàn về mặc định
      const inputs = document.querySelectorAll(".m-dialog-content .row input");
      for (const input of inputs) {
        input.value = "";
        input.style.borderColor = "rgba(221, 221, 221, 0.911)";
      }
      //3. set ẩn from
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
      // Tìm hàng (tr) chứa nút được nhấn
      const tr = event.target.closest("tr");
      if (tr) {
        // Lấy dữ liệu từ dataset
        const item = JSON.parse(tr.dataset.entity);
        this.employeeIdForDelete = item.EmployeeId;
        console.log(this.employeeIdForDelete);
      }
    } catch (error) {
      console.error(error);
    }
  }
  //
  //click sửa nhân viên sẽ hiển thị thông báo
  //
  btnEditEmployee() {
    try {
      this.fromMode = "edit";
      // Tìm hàng (tr) chứa nút được nhấn
      const tr = event.target.closest("tr");
      if (tr) {
        // Lấy dữ liệu từ dataset
        const item = JSON.parse(tr.dataset.entity);
        this.employeeIdForUpdate = item.EmployeeId;
        console.log(this.employeeIdForUpdate);
        // Điền dữ liệu vào các trường trong form
        document.getElementById("mnv").value = item.EmployeeCode;
        document.getElementById("hoten").value = item.FullName;
        document.getElementById("ngaysinh").value = item.IdentityDate
          ? new Date(item.IdentityDate).toISOString().slice(0, 10)
          : "";
        document.getElementById("email").value = item.Email;
        document.getElementById("diachi").value = item.Address;
        // Cập nhật giá trị giới tính
        if (item.GenderName === "Nam") {
          document.getElementById("Nam").checked = true;
        } else if (item.GenderName === "Nữ") {
          document.getElementById("Nu").checked = true;
        } else {
          document.getElementById("Khac").checked = true;
        }
        // Hiển thị form thông tin nhân viên
        document.getElementById("from-dialog").style.display = "block";
      }
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
        //Lấy thông tin cần thiết để thêm nhân viên
        const employeeCode = document.querySelector("#mnv").value;
        const fullName = document.querySelector("#hoten").value;
        const Email = document.querySelector("#email").value;
        const ngaySinh = document.querySelector("#ngaysinh").value;
        const diaChi = document.querySelector("#diachi").value;
        const radios = document.querySelectorAll('input[name="gioitinh"]');
        let gioiTinh;
        // Duyệt qua các radio button
        for (const radio of radios) {
          // Kiểm tra nếu radio button đang được chọn
          if (radio.checked) {
            gioiTinh = radio.value;
            break;
          }
        }
        //2. Build Object
        let employee = {
          EmployeeCode: employeeCode,
          FullName: fullName,
          GenderName: gioiTinh,
          DateOfBirth: ngaySinh,
          Email: Email,
          Address: diaChi,
        };
        //3.Gọi Api Thực hiện thêm mới
        // Gọi Api Thực hiện thêm mới
        this.showLoading();
        if (this.fromMode == "save") {
          fetch("https://cukcuk.manhnv.net/api/v1/Employees", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
          })
            .then((response) => {
              this.hideLoading();
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              //4. hiển thị loading
              this.showLoading();
              //5.Sau khi thực hiện thêm xong thực hiển ấn loading, ẩn from chi tiết, loading lại dữ liệu
              this.loadData();
              this.btnCloseFrom();
              alert("Dữ liệu đã được thêm mới thành công.");
            })
            .catch((error) => {
              alert("Đã xảy ra lỗi khi thêm mới dữ liệu.");
              this.hideLoading();
            });
        } else {
          fetch(
            `https://cukcuk.manhnv.net/api/v1/Employees/${this.employeeIdForUpdate}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(employee),
            }
          )
            .then((response) => {
              this.hideLoading();
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              //4. hiển thị loading
              this.showLoading();
              //5.Sau khi thực hiện sửa xong thực hiển ấn loading, ẩn from chi tiết, loading lại dữ liệu
              this.loadData();
              this.btnCloseFrom();
              alert("Dữ liệu đã được sửa thành công.");
            })
            .catch((error) => {
              alert("Đã xảy ra lỗi khi sửa dữ liệu.");
              this.hideLoading();
            });
        }
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
      const ngaySinh = document.querySelector("#ngaysinh").value;
      const ngayCap = document.querySelector("#ngaycap").value;
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
      if (ngaySinh) {
        // Chuyển đổi date thành đối tượng Date
        const inputDate = new Date(ngaySinh);
        const currentDate = new Date();
        // Kiểm tra nếu ngày sinh lớn hơn ngày hiện tại
        if (inputDate > currentDate) {
          warning.Msg.push("Ngày sinh không được lớn hơn ngày hiện tại.");
          document.querySelector("#ngaysinh").style.borderColor = "red";
        } else {
          // Đặt lại borderColor nếu ngày sinh hợp lệ
          document.querySelector("#ngaysinh").style.borderColor =
            "rgba(221, 221, 221, 0.911)";
        }
      }
      if (ngayCap) {
        // Chuyển đổi date thành đối tượng Date
        const inputDate = new Date(ngayCap);
        const currentDate = new Date();
        // Kiểm tra nếu ngày sinh lớn hơn ngày hiện tại
        if (inputDate > currentDate) {
          warning.Msg.push("Ngày cấp không được lớn hơn ngày hiện tại.");
          document.querySelector("#ngaycap").style.borderColor = "red";
        } else {
          // Đặt lại borderColor nếu ngày sinh hợp lệ
          document.querySelector("#ngaycap").style.borderColor =
            "rgba(221, 221, 221, 0.911)";
        }
      }
      if (Email) {
        // Biểu thức chính quy kiểm tra định dạng email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(Email)) {
          warning.Msg.push("Email không đúng định dạng.");
          document.querySelector("#email").style.borderColor = "red";
        } else {
          // Đặt lại borderColor nếu ngày sinh hợp lệ
          document.querySelector("#email").style.borderColor =
            "rgba(221, 221, 221, 0.911)";
        }
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
  //Nhấn nút có trên from thông báo xóa nhân viên
  btnYes() {
    try {
      if (!this.employeeIdForDelete) {
        console.error("Employee ID is not defined.");
        return;
      }

      fetch(
        `https://cukcuk.manhnv.net/api/v1/Employees/${this.employeeIdForDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          this.hideLoading();
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // optional if you need to process response data
        })
        .then((data) => {
          // Hiển thị loading
          document.querySelector("#from-dialog-notice").style.display = "none";
          this.showLoading();
          // Sau khi thực hiện thêm xong thực hiện ẩn form chi tiết, loading lại dữ liệu
          this.loadData();
          this.btnCloseFrom();
          alert("Dữ liệu đã được xóa thành công.");
        })
        .catch((error) => {
          alert("Đã xảy ra lỗi khi xóa dữ liệu.");
          console.error("Error:", error);
          this.hideLoading();
        });
    } catch (error) {
      console.error(error);
    }
  }

  //Tìm kiếm theo mã nhân viên, Họ tên
  selectEmployee() {
    try {
      this.showLoading();
      // gọi API lấy dữ liệu
      fetch("https://cukcuk.manhnv.net/api/v1/Employees").then((res) =>
        res.json().then((data) => {
          // Lấy ra table
          const table = document.querySelector("#data-table-id");
          const tbody = table.querySelector("tbody");
          tbody.innerHTML = ""; // Xóa dữ liệu cũ trong tbody
          //Lấy ra mã nhân viên trong input
          const employCode = document.querySelector("#m-search-employee");
          // Duyệt từng phần tử trong data:
          for (const item of data) {
            if (
              employCode.value == item.EmployeeCode &&
              employCode.value != ""
            ) {
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
                <td>${1}</td>
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
              tr.dataset.entity = JSON.stringify(item);
              table.querySelector("tbody").append(tr);
              // Gán sự kiện cho các nút sau khi chúng được thêm vào DOM
              //1. Gán sự kiện nút close
              const buttonTableClose =
                document.querySelectorAll(".button-close-icon");
              for (const button of buttonTableClose) {
                button.addEventListener(
                  "click",
                  this.btnDeleteEmployee.bind(this)
                );
              }
              //2. Gán sự kiện nút chỉnh sửa
              const buttonTableEdit =
                document.querySelectorAll(".button-edit-icon");
              for (const button of buttonTableEdit) {
                button.addEventListener("click", (event) =>
                  this.btnEditEmployee(event)
                );
              }
              employCode.value = "";
              break;
            } else {
              const tbody = table.querySelector("tbody");
              tbody.innerHTML = ""; // Xóa dữ liệu cũ trong tbody
            }
          }
          this.hideLoading();
        })
      );
    } catch (error) {
      console.error(error);
    }
  }
}
