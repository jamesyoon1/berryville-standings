document.addEventListener('DOMContentLoaded', function () {
    
    const csvData = `
Timestamp,WINNER,LOSER,SCORE (WINNER),SCORE (LOSER)
12/28/2023 13:03:13,RYAN K,KEVIN L,14,12
12/28/2023 15:35:17,KEVIN L,RYAN K,11,6
12/28/2023 15:40:06,KEVIN D,JAMES Y,11,7
12/28/2023 15:44:12,KEVIN L,KEVIN D,11,1
12/28/2023 15:48:51,CHASE G,KEVIN D,11,6
12/28/2023 15:53:48,CHASE G,JAMES Y,11,8
12/28/2023 15:58:14,RYAN K,KEVIN D,11,9
12/28/2023 16:01:25,RYAN K,KEVIN L,11,6
12/28/2023 16:41:05,KEVIN L,JAMES Y,11,9
12/28/2023 16:44:24,RYAN K,KEVIN L,11,8
12/28/2023 16:52:07,KEVIN L,JAMES Y,11,9
12/28/2023 16:52:21,JAMES Y,RYAN K,11,8
12/28/2023 16:56:48,KEVIN L,RYAN K,12,10
12/28/2023 17:01:01,RYAN K,KEVIN L,11,4
12/28/2023 17:05:03,KEVIN L,JAMES Y,11,8
12/29/2023 11:59:46,KEVIN L,JAMES Y,11,8
12/29/2023 12:07:00,JAMES Y,KEVIN D,11,6
12/29/2023 12:39:28,JAMES Y,KEVIN D,11,0
12/29/2023 12:43:04,KEVIN L,JAMES Y,11,7
12/29/2023 12:47:47,KEVIN L,RYAN K,11,7
12/29/2023 12:51:54,KEVIN L,CHASE G,11,2
12/29/2023 12:58:09,CHASE G,RYAN K,13,11
12/29/2023 13:01:44,KEVIN L,KEVIN D,11,0
12/29/2023 13:09:40,RYAN K,KEVIN L,11,8
    `;
    
    const rows = csvData.trim().split('\n').map(row => row.split(','));
    //rows.reverse();
    
    // Get the table reference
    const table = document.getElementById('csvTable').getElementsByTagName('tbody')[0];

    // Add data rows dynamically
    for (let i = rows.length-1; i > 0; i--) {
        const tr = table.insertRow();
        // Only take the date part from the timestamp
        const date = rows[i][0].split('/202')[0];
        // Create a new array with the modified data
        const rowData = [date, rows[i][1], rows[i][3], rows[i][4], rows[i][2]];
        rowData.forEach(cellData => {
            const td = tr.insertCell();
            td.textContent = cellData;
        });
    }
    
    
    
    console.log(rows)
    const teamStats = {};
    
    rows.slice(1).forEach(row => {
        const winner = row[1];
        const loser = row[2];
        
        teamStats[winner] = teamStats[winner] || { played: 0, won: 0, lost: 0 };
        teamStats[loser] = teamStats[loser] || { played: 0, won: 0, lost: 0 };
        
        teamStats[winner].played++;
        teamStats[loser].played++;
        
        if (parseInt(row[3]) > parseInt(row[4])) {
            teamStats[winner].won++;
            teamStats[loser].lost++;
        } else {
            teamStats[loser].won++;
            teamStats[winner].lost++;
        }
    });
    
    const standingsData = Object.keys(teamStats).map(team => {
        const { played, won, lost } = teamStats[team];
        const percentage = (won / played).toFixed(3);
        return {
            name: team,
            played,
            won,
            lost,
            percentage
        };
    });
    
    standingsData.sort((a, b) => b.percentage - a.percentage);
    
    standingsData.forEach((team, index) => {
        team.position = index + 1;
    });
    
    console.log("standingsData:", standingsData);
    
    // Function to generate table rows
    function generateTableRows(data) {
        return data.map(player => `
        <tr>
        <td>${player.position}</td>
        <td>${player.name}</td>
        <td>${player.played}</td>
        <td>${player.won}</td>
        <td>${player.lost}</td>
        <td>${player.percentage}</td>
        </tr>
        `).join('');
    }
    
    // Insert the generated table rows into the tbody
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = generateTableRows(standingsData);
});



