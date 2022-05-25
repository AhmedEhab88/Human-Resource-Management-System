using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HRMS_API.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }

        [Required(AllowEmptyStrings = false)]
        public int SSN { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Column(TypeName = "nvarchar(255)")]
        public string FirstName { get; set; }
        
        [Required(AllowEmptyStrings = false)]
        [Column(TypeName = "nvarchar(255)")]
        public string LastName { get; set; }
        
        [Required(AllowEmptyStrings = false)]
        [Column(TypeName = "nvarchar(25)")]
        public string PhoneNumber { get; set; }
        
        [Required(AllowEmptyStrings = false)]
        public string Department { get; set; }
        
        [Required(AllowEmptyStrings = false)]
        public string Position { get; set; }
        
        [Required(AllowEmptyStrings = false)]
        public float Salary { get; set; }

        public static explicit operator Employee(CreatedAtActionResult v)
        {
            throw new NotImplementedException();
        }
    }
}
