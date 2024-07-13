window.onload = function () {
  new employeePage();
};

class employeePage {
  pageTile = "Quản lý nhân viên ";
  constructor() {
    this.initEvents();
    //thêm các button vào table
    this.addBtnTable();
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

        const editButton = document.createElement("button");
        editButton.className = "button-table button-edit-icon";
        const copyButton = document.createElement("button");
        copyButton.className = "button-table button-copy-icon";
        const closeButton = document.createElement("button");
        closeButton.className = "button-table button-close-icon";

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
}
