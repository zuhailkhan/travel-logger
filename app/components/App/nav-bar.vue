<script lang="ts" setup>
const isSignedIn = ref<boolean>(false);
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Travel Assistant
      </NuxtLink>
    </div>
    <div class="navbar-end gap-2">
      <ThemeToggle :icon-size="24" />
      <template v-if="isSignedIn">
        <input
          type="text"
          placeholder="Search"
          class="input input-bordered w-24 md:w-auto"
        >
        <div v-if="isSignedIn" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Profile Component" src="https://cdn-icons-png.flaticon.com/512/149/149071.png">
          </div>
        </div>
      </template>
      <div v-else class="btn btn-accent">
        Sign In With Github
        <Icon name="tabler:brand-github" :size="24" />
      </div>
    </div>
  </div>
</template>
