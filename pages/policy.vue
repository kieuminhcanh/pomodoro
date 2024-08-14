<template>
  <UContainer class="relative z-10">
    <div class="flex flex-row justify-center py-16 backdrop-blur-md bg-black/30 ">
      <div class="basis-11/12 md:basis-1/2">
        <h1 class="text-3xl font-bold mb-4">Privacy Policy</h1>

        <p class="mb-4">
          This privacy policy sets out how our website uses and protects any information that you give us when you use
          this website.
        </p>

        <h2 class="text-2xl font-bold mb-2">Information We Collect</h2>

        <p class="mb-4">
          We may collect the following information:
        </p>

        <p class="mb-4">
          We do not collect any personal information from you when you use the App. This means we do not collect data
          that
          can be used to identify you, such as your name, email address, phone number, location, contacts, or any other
          personally identifiable information.
        </p>

        <h2 class="text-2xl font-bold mb-2">Security</h2>

        <p class="mb-4">
          While we do not collect any personal information, we take the security of your device and the App seriously.
          We
          strive to use commercially reasonable measures to protect any information stored on your device. However,
          please
          be aware that no security measures are perfect.
        </p>

        <h2 class="text-2xl font-bold mb-2">Contact Us</h2>
        <p class="mb-4">
          minhcanhdn0704@gmail.com
        </p>

        <h2 class="text-2xl font-bold mb-2">Other</h2>
        <p class="mb-4">
          This privacy policy is subject to change without notice.
        </p>
      </div>
    </div>
    <UButton icon="i-heroicons-home" block to="/" aria-label="Home">Home</UButton>
  </UContainer>
</template>

<script lang="ts" setup>
  useSeoMeta({
    title: 'Pomodoro Timer - Privacy Policy',
    ogTitle: 'Pomodoro Timer - Privacy Policy',    
  })

</script>

<style></style>
