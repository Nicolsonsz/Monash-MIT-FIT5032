<template>
  <!-- Activity 1: Create Form Vue component -->
  <!-- <div>
    <h1>User Information Form / Credentials</h1>
  </div> -->

  <!-- Activity 2: Add Form and Input Types to Form.vue -->
  <!-- <div class="form">
    <h1>User Information Form / Credentials</h1>
        <form>
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username"><br>
            
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password"><br>
            
            <label for="isAustralian">Australian Resident?</label><br>
            <input type="checkbox" id="isAustralian" name="isAustralian"><br>
            
            <label for="reason">Reason For Joining:</label><br>
            <textarea id="reason" name="reason" rows="3"></textarea><br>
            
            <label for="gender">Gender</label><br>
            <select id="gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </select>
        </form>
    </div> -->

  <!-- Activity 5: Form styling with Bootstrap 5's CSS -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
        <h1 class="text-center mb-4">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 mb-3 mb-md-0">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" @blur="() => validateName(true)"
                @input="() => validateName(false)" v-model="formData.username" />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)" v-model="formData.password" />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 mb-3 mb-sm-0">
                <label for="isAustralian" class="form-label">Australian Resident?</label>
                <select class="form-select" id="isAustralian"  v-model="formData.isAustralian" @change="validateAustralianResident()">
                  <option value="" disabled selected>Select your response</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <div v-if="errors.isAustralian" class="text-danger">{{ errors.isAustralian }}</div>
            </div>
            <div class="col-md-6 mb-3 mb-sm-0">
                <label for="gender" class="form-label">Gender</label>
                <select class="form-select" id="gender"  v-model="formData.gender" @change="validateGender()">
                  <option value="" disabled selected>Select your response</option>
                  <option value="Yes">Male</option>
                  <option value="No">Female</option>
                  <option value="other">Other</option>
                </select>
                <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea class="form-control" id="reason" rows="3" @blur="() => validateReason(true)"
            v-model="formData.reason"></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
        <!-- Activity 6: Display User Information in a Card via Submit Button -->
        <div class="row mt-5" v-if="submittedCards.length">
          <div class="d-flex flex-column flex-sm-row flex-wrap justify-content-center justify-content-sm-start">
            <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
              <div class="card-header">
                User Information
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Username: {{ card.username }}</li>
                <li class="list-group-item">Password: {{ card.password }}</li>
                <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
                <li class="list-group-item">Gender: {{ card.gender }}</li>
                <li class="list-group-item">Reason: {{ card.reason }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- PrimeVue DataTable -->
        <DataTable :value="submittedCards" class="mt-4">
          <Column field="username" header="Username"></Column>
          <Column field="password" header="Password"></Column>
          <Column field="isAustralian" header="Australian Resident">
            <template #body="slotProps">
              {{ slotProps.data.isAustralian ? 'true' : 'false' }}
            </template>
          </Column>
          <Column field="gender" header="Gender"></Column>
          <Column field="reason" header="Reason"></Column>
        </DataTable>
      </div>
    </div>
  </div>

</template>

<script setup>
// Our logic will go here
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
    username: '',
    password: '',
    isAustralian: '',
    reason: '',
    gender: ''
});

const submittedCards = ref([]);

// const submitForm = () => {
//   submittedCards.value.push({
//     ...formData.value
//   });
//   clearForm();
// };

const submitForm = () => {
  validateName(true);
  validatePassword(true);
  validateAustralianResident();
  validateGender();
  validateReason(true);
  if (!errors.value.username && !errors.value.password) {
    submittedCards.value.push({ ...formData.value });
    clearForm();
  }
};

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: '',
    reason: '',
    gender: ''
  };
};

const errors = ref ({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
});

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = "Name must be at least 3 characters";
  } else {
    errors.value.username = null;
  }
};

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?:{}|<>]/.test(password);

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
  } else if (!hasUppercase) {
    if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
  } else if (!hasLowercase) {
    if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number.";
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = "Password must contain at least one special character.";
  } else {
    errors.value.password = null;
  }
};

const validateAustralianResident = () => {
  if(!formData.value.isAustralian){
    errors.value.isAustralian = "Please select your response";
  }
  else{
    errors.value.isAustralian = null;
  }
  
};

const validateGender = () => {
  if (!formData.value.gender) {
    errors.value.gender = "Please select a gender";
  } else {
    errors.value.gender = null;
  }
};

const validateReason = (blur) => {
  if (!formData.value.reason.trim()) {
    if (blur) errors.value.reason = "Please provide a reason for join";
  } else if (formData.value.reason.trim().length < 10) {
    if (blur) errors.value.reason = "Your input must be at least 10 characters long";
  } else if (formData.value.reason.trim().length > 500){
    if (blur) errors.value.reason = "Your input must not be more than 500 characters long";
  } else {
    errors.value.reason = null;
  }
};
</script>

<style scoped>
/* Our logic will go here */
.card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }
</style>