<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Access Denied</h2>
          </div>
          <div class="card-body text-center">
            <p class="mb-3">You need to be logged in to view this page.</p>
            <router-link to="/login" class="btn btn-primary">Go to Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
