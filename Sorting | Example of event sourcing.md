Event sourcing can be used to identify min/max and sorting in a distributed environment.

### Min/Max Event

<table>
  <tr>
    <th> Steps</th> <th>Example/Action</th>
  </tr>
  <tr>
    <td>
      1. Decide an result event structure
    </td>
    <td>
      <code>
        event_id: [uuid]
        max: -1
        record_id: [id]
        table: 'transaction_summary'
        column: 'revenue'
        event_type: CREATED/UPDATED
      </code>
    </td>
    <tr>
      <td>2. Decide number of max parallelism</td>
      <td>8</td>
    </tr>
   <tr> 
     <td>3. Batch the data and determine required number of instances</td>
    <td>4</td>
   </tr>
    <tr>
      <td>4. Launch the application instances and provide the batch ranges</td><td>Instances will subscribe to the event source</td>
    </tr>
   <tr>
      <td>5. Each instance will publish an event like above with intial as -1</td><td>They will start processing their batches</td>
    </tr>
    <tr>
      <td>6. Upon recieving such an event, if max value is greater than their internal state max</td><td>Update the internal state and publish again.</td>
    </tr>
   <tr>
      <td>7. Upon recieving such an event, if max value is less than or equal to their internal state max</td><td>Ignore the event</td>
    </tr>
    <tr>
      <td>8. Batch processing completed</td><td>Publish the internal state.</td>
    </tr>
    <tr>
      <td>9. If two application published same event at same time.</td>
      <td>Both will recieve the updated event from another, applying 6th and 7th rules, they may choose to update or ignore the message.</td>
    </tr>
  </tr>
</table>

