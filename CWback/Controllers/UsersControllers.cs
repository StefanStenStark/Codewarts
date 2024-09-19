using CWback.Data;
using CWback.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
public class UsersController : ControllerBase
{

    private readonly CWContext _context;

    public UsersController(CWContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUser([FromBody] User user)
    {

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateUser(int id, [FromBody] User updatedUser)
    {
        if (id != updatedUser.Id)
        {
            return BadRequest("The User Id doesnt match");
        }
        var foundUser = await _context.Users.FindAsync(id);

        if (foundUser == null)
        {
            return NotFound("User was not found");
        }

        foundUser!.Name = updatedUser.Name;
        foundUser.Avatar = updatedUser.Avatar;
        foundUser.House = updatedUser.House;
        foundUser.AdventuresCompleted = updatedUser.AdventuresCompleted;
        foundUser.ExperiencePoints = updatedUser.ExperiencePoints;
        foundUser.Level = updatedUser.Level;
        foundUser.MaximumHearts = updatedUser.MaximumHearts;

        var result = await _context.SaveChangesAsync();

        if (result == 0)
        {
            return BadRequest("Server error occuresd when updating User");
        }

        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
