
document.addEventListener('DOMContentLoaded', () => {
        const display = document.getElementById('display');
        const resultDiv = document.getElementById('result');
    
    
        window.appendToDisplay = (input) => {
            display.value += input;
        };
    
       
        window.removeOne = () => {
            display.value = display.value.slice(0, -1);
        };
    
      
        window.clearDisplay = () => {
            display.value = '';
        };
    
        
        window.calculate = async () => {
            const expression = display.value;
            if (!expression) {
                resultDiv.innerHTML = 'Please enter a logical expression.';
                return;
            }
    
            try {
                const response = await fetch(`/api/truth-table?expression=${encodeURIComponent(expression)}`);
                const data = await response.json();
                
                if (data.error) { 
                    resultDiv.innerHTML = `Expressão invalida `;
                    return;
                }
    
               
                let html = '<table border="1"><thead><tr>';
             
                data.columns.forEach(col => {
                    html += `<th>${col}</th>`;
                });
                html += '</tr></thead><tbody>';
    
             
                data.rows.forEach(row => {
                    html += '<tr>';
                    row.forEach(cell => {
                        html += `<td>${cell}</td>`;
                    });
                    html += '</tr>';
                });
    
                html += '</tbody></table>';
                resultDiv.innerHTML = html;
            } catch (error) {
                resultDiv.innerHTML = `Error fetching truth table: ${error.message}`;
            }
        };
    });
    