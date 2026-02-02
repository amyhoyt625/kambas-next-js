export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
        <textarea 
  id="wd-description" cols={50} rows={10}
  defaultValue="The assignment is available online Submit a link to the landing page of your Web  application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kambaz application Links to all relevant source code repositories. The Kambaz application should include a link to navigate back to the landing page."
/> <br />
        
        <br />
        <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" defaultValue={100} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
            <label htmlFor="wd-select-assignment-group"> Assignment Group </label>
            </td>
            <td>
            <select id="wd-select">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="PROJECTS">PROJECTS</option>
            </select>
            </td>
          </tr>
 
          <tr>
            <td align="right" valign="top">
            <label htmlFor="wd-select-grade-type"> Display Grade as </label>
            </td>
            <td>
            <select id="wd-select]">
                <option value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
            </select>
            </td>
          </tr>
          <br />
          <tr>
  <td align="right" valign="top">
    <label htmlFor="wd-select-submission-type">Submission Type</label>
  </td>
  <td>
    <select id="wd-select">
      <option value="ONLINE">Online</option>
    </select>
    <br /><br />
    
    <label>Online Entry Options</label>
    <br />
    <input type="checkbox" name="check-genre" id="wd-chkbox-text" />
    <label htmlFor="wd-chkbox-text">Text Entry</label>
    <br />
    <input type="checkbox" name="check-genre" id="wd-chkbox-url" />
    <label htmlFor="wd-chkbox-url">Website URL</label>
    <br />
    <input type="checkbox" name="check-genre" id="wd-chkbox-media" />
    <label htmlFor="wd-chkbox-media">Media Recordings</label>
    <br />
    <input type="checkbox" name="check-genre" id="wd-chkbox-student" />
    <label htmlFor="wd-chkbox-student">Student Annotation</label>
    <br />
    <input type="checkbox" name="check-genre" id="wd-chkbox-upload" />
    <label htmlFor="wd-chkbox-upload">File Uploads</label>
  </td>
</tr>
<br />
<tr>
  <td align="right" valign="top">
    <label htmlFor="wd-assign">Assign</label>
  </td>
  <td>
    <label htmlFor="wd-assign">Assign to</label>
    <br />
    <input id="wd-assign" defaultValue="Everyone" />
  </td>
</tr>

<br />

<tr>
<td align="right" valign="top">
    <label htmlFor="wd-text-fields-due"> </label>
    </td>
    <td>
    <label htmlFor="wd-due">Due</label>
    <br />
    <input type="date" defaultValue="2024-05-13" id="wd-text-fields-due" />
  </td>
</tr>

<br />

<tr>
<td align="right" valign="top">
    </td>
    <td>
    <label htmlFor="wd-available">Available from</label>
    <br />
    <input type="date" defaultValue="2024-05-06" id="wd-text-fields-available" />
  </td>
  <td>
    <label htmlFor="wd-until">Until</label>
    <br />
    <input type="date" defaultValue="2024-05-20" id="wd-text-fields-available" />
  </td>
</tr>

<tr>
  <td colSpan={3}>
    <hr />
  </td>
</tr>

<tr>
  <td colSpan={3} align="right">
    <button>Cancel</button> <button>Save</button>
  </td>
</tr>

</tbody>
        </table>

      </div>
  );}
  