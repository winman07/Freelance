// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Logo styling
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.transform = 'rotate(270deg)';
        logo.style.maxHeight = '40vh';
        logo.style.maxWidth = '90%';
        logo.style.margin = '0 auto';
        logo.style.display = 'block';
    }

    // Image styling for 50 states
    const statesImg = document.querySelector('.fiftystates');
    if (statesImg) {
        statesImg.style.border = '3px solid #fc040a'; // Logo red border
        statesImg.style.borderRadius = '8px';
        statesImg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    }

    // Image styling for class photo
    const classPhotoImg = document.querySelector('.classphoto');
    if (classPhotoImg) {
        classPhotoImg.style.border = '3px solid #fc040a'; // Logo red border
        classPhotoImg.style.borderRadius = '8px';
        classPhotoImg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    }
    
    // Image styling for class fee
    const classFeeImg = document.querySelector('.classfee');
    if (classFeeImg) {
        classFeeImg.style.border = '3px solid #fc040a'; // Logo red border
        classFeeImg.style.borderRadius = '8px';
        classFeeImg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        classFeeImg.style.maxWidth = '80%';
        classFeeImg.style.margin = '0 auto';
        classFeeImg.style.display = 'block';
    }

    // Form styling for checkboxes and radio buttons
    const inputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    inputs.forEach(input => {
        input.style.width = 'auto';
        input.style.marginRight = '0.5rem';
        if (input.parentElement) {
            input.parentElement.style.display = 'flex';
            input.parentElement.style.alignItems = 'center';
        }
    });
    
    // Add form validation event listeners
    const forms = document.querySelectorAll('form[data-netlify="true"]');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!validateForm(this)) {
                event.preventDefault();
                showMessage('Form could not be submitted. Please make sure all fields are filled in correctly and try again.', 'error');
            }
        });
    });
});

/**
 * Validates form fields
 * @param {HTMLFormElement} form - The form to validate
 * @return {boolean} - True if valid
 */
function validateForm(form) {
    const requiredInputs = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.style.border = '2px solid red';
        } else {
            input.style.border = '2px solid #cfa434';
        }
        
        // Validate email format
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.style.border = '2px solid red';
            }
        }
        
        // Validate phone format
        if (input.type === 'tel' && input.value) {
            // Remove any non-digit characters for validation
            const digits = input.value.replace(/\D/g, '');
            if (digits.length !== 10) {
                isValid = false;
                input.style.border = '2px solid red';
            }
        }
    });
    
    // Validate consent radio button
    const consentCheckbox = form.querySelector('input[name="classes"][type="radio"]');
    if (consentCheckbox && !consentCheckbox.checked) {
        isValid = false;
        consentCheckbox.parentElement.style.color = 'red';
    } else if (consentCheckbox) {
        consentCheckbox.parentElement.style.color = '#1846e9';
    }
    
    return isValid;
}

/**
 * Shows a message popup to the user
 * @param {string} message - The message to display
 * @param {string} type - The message type (success/error)
 */
function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        document.body.removeChild(existingMessage);
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = 'message-popup';
    messageEl.textContent = message;
    messageEl.style.position = 'fixed';
    messageEl.style.top = '20%';
    messageEl.style.left = '50%';
    messageEl.style.transform = 'translate(-50%, -50%)';
    messageEl.style.padding = '1rem';
    messageEl.style.borderRadius = '4px';
    messageEl.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    messageEl.style.zIndex = '1000';
    messageEl.style.minWidth = '300px';
    messageEl.style.textAlign = 'center';
    
    // Style based on message type
    if (type === 'success') {
        messageEl.style.backgroundColor = '#4CAF50';
        messageEl.style.color = 'white';
    } else {
        messageEl.style.backgroundColor = '#F44336';
        messageEl.style.color = 'white';
    }
    
    // Add close button
    const closeButton = document.createElement('span');
    closeButton.textContent = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '10px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '20px';
    closeButton.style.fontWeight = 'bold';
    closeButton.addEventListener('click', function() {
        document.body.removeChild(messageEl);
    });
    messageEl.appendChild(closeButton);
    
    document.body.appendChild(messageEl);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(messageEl)) {
            messageEl.style.opacity = '0';
            messageEl.style.transition = 'opacity 0.5s';
            
            setTimeout(() => {
                if (document.body.contains(messageEl)) {
                    document.body.removeChild(messageEl);
                }
            }, 500);
        }
    }, 5000);
}