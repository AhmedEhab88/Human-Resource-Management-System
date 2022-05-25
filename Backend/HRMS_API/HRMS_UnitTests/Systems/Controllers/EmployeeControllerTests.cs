using FluentAssertions;
using HRMS_API.Controllers;
using HRMS_API.Models;
using HRMS_API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace HRMS_UnitTests.Systems.Controllers
{
    public class EmployeeControllerTests
    {
        private readonly Mock<IEmployeeRepository> repositoryStub = new();
        private readonly Random rand = new();

        [Fact]
        public async Task GetEmployee_WithUnexistingEmployee_ReturnsNotFound()
        {
            // Arrange -    Setting up the system under test.
            repositoryStub.Setup(repo => repo.Get(-1))
                .ReturnsAsync((Employee)null);

            var controller = new EmployeeController(repositoryStub.Object);

            // Act -        Calling the method to be tested.
            var result = await controller.GetEmployees(-1);

            // Assert -     Asserts the outcome of the arrangement.
            result.Result.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async Task GetEmployee_WithExistingEmployee_ReturnsExpectedEmployee()
        {
            // Arrange -    Setting up the system under test.
            Employee expectedEmployee = CreateRandomEmployee();

            repositoryStub.Setup(repo => repo.Get(-1))
                .ReturnsAsync(expectedEmployee);

            var controller = new EmployeeController(repositoryStub.Object);

            // Act -        Calling the method to be tested.
            var result = await controller.GetEmployees(-1);

            // Assert -     Asserts the outcome of the arrangement.

            // The options.ComparingByMembers allows to compare the attributes of each employee.
            result.Value.Should().BeEquivalentTo(
                expectedEmployee,
                options => options.ComparingByMembers<Employee>());
        }

        [Fact]
        public async Task GetEmployees_WithExistingEmployees_ReturnsAllEmployees()
        {
            // Arrange
            var expectedEmployees = new[]
            {
                CreateRandomEmployee(),
                CreateRandomEmployee(),
                CreateRandomEmployee(),
                CreateRandomEmployee(),
                CreateRandomEmployee()
            };

            repositoryStub.Setup(repo => repo.Get())
                .ReturnsAsync(expectedEmployees);

            var controller = new EmployeeController(repositoryStub.Object);

            // Act
            var actualEmployees = await controller.GetEmployees();

            // Assert
            actualEmployees.Should().BeEquivalentTo(
                expectedEmployees,
                options => options.ComparingByMembers<Employee>()
                );
        }

        [Fact]
        public async Task CreateEmployee_WithEmployeeToCreate_ReturnsCreatedEmployee()
        {
            // Arrange
            var employeeToCreate = new Employee()
            {
                SSN = rand.Next(111111111, 666666666),
                FirstName = "Youssef",
                LastName = "Ahmed",
                PhoneNumber = "022587848",
                Department = "Sales",
                Position = "Manager",
                Salary = rand.Next(1, 10001)
            };

            var controller = new EmployeeController(repositoryStub.Object);

            // Act
            var result = await controller.PostEmployee(employeeToCreate);

            // Assert
            var createdEmployee = (result.Result as CreatedAtActionResult).Value as Employee;
            employeeToCreate.Should().BeEquivalentTo(
                createdEmployee,
                options => options.ComparingByMembers<Employee>().ExcludingMissingMembers()
            );
            
        }

        [Fact]
        public async Task UpdateEmployee_WithExistingEmployee_ReturnsNoContent()
        {
            // Arrange
            Employee existingEmployee = CreateRandomEmployee();

            repositoryStub.Setup(repo => repo.Get(-1))
                .ReturnsAsync(existingEmployee);

            // Declaring the updated item.
            var employeeId = existingEmployee.EmployeeId;
            var employeeToUpdate = new Employee()
            {
                EmployeeId = employeeId,
                SSN = rand.Next(111111111, 666666666),
                FirstName = "Khaled",
                LastName = "Tareq",
                PhoneNumber = "035788963",
                Department = "Art",
                Position = "Manager",
                Salary = (float)(existingEmployee.Salary * 1.2)
            };

            var controller = new EmployeeController(repositoryStub.Object);

            // Act
            var result = await controller.PutEmployee(employeeId, employeeToUpdate);

            // Assert
            result.Should().BeOfType<NoContentResult>();
        }

        [Fact]
        public async Task UpdateEmployee_WithUnexistingEmployee_ReturnsBadRequest()
        {
            // Arrange
            Employee existingEmployee = CreateRandomEmployee();

            repositoryStub.Setup(repo => repo.Get(-1))
                .ReturnsAsync(existingEmployee);

            // Declaring the updated item.
            var employeeId = existingEmployee.EmployeeId;
            var employeeToUpdate = new Employee()
            {
                EmployeeId = employeeId + 1,
                SSN = rand.Next(111111111, 666666666),
                FirstName = "Khaled",
                LastName = "Tareq",
                PhoneNumber = "035788963",
                Department = "Art",
                Position = "Manager",
                Salary = (float)(existingEmployee.Salary * 1.2)
            };

            var controller = new EmployeeController(repositoryStub.Object);

            // Act
            var result = await controller.PutEmployee(employeeId, employeeToUpdate);

            // Assert
            result.Should().BeOfType<BadRequestResult>();
        }

        private Employee CreateRandomEmployee()
        {
            return new()
            {
                EmployeeId = rand.Next(),
                SSN = rand.Next(111111111, 666666666),
                FirstName = "Youssef",
                LastName = "Ahmed",
                PhoneNumber = "022587848",
                Department= "Sales",
                Position = "Manager",
                Salary = rand.Next(1, 10001)
            };
        
        }
    }
}
