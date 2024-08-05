namespace MISA.Web2024.API.Model
{
    public class Employee
    {   // INSERT INTO Employee (EmployeeId, EmployeeCode, FullName, DateOfBirth,  Email, PhoneNumber, Address, LandlineNumber, BankAccount, BankName)
        public Guid EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public DateTime DateOfBirth {  get; set; }
        public string IdentityNumber { get; set; }
        public string FullName { get; set; }
        public int Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string GenderName { 
            get
            {
                switch (Gender)
                {
                    case 0:
                        return "Nữ";
                    case 1:
                        return "Nam";
                    default:
                        return "Không xác định";
                }
            } 
        }
        public string Address { get; set; }
        public string LandlineNumber { get; set; }
        public string BankAccount { get; set; }
        public string BankName { get; set; }
    }
}
