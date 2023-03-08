<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <slot name="outsideCollapse"></slot>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapseButton"
        aria-controls="collapseButton" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapseButton">
        <ul class="navbar-nav d-flex w-100 mb-2 mb-lg-0">
          <slot name="insideCollapse"></slot>
        </ul>
      </div>
    </div>
  </nav>
</template>