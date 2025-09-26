<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Travel Assistant</a>
    </div>
    <div class="flex gap-2">
      <input
        type="text"
        placeholder="Search"
        class="input input-bordered w-24 md:w-auto"
      >
      <div class="dropdown dropdown-end">
        <div class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="https://cdn-icons-png.flaticon.com/512/149/149071.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
