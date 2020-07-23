<template>
  <fragment>
    <div class="container mx-auto px-4">
      <h1 class="text-center">Mon compte</h1>
      <ChangePassword />
      <ChangeEmail />
      <GoingBackButton pathName="dashboard" />
    </div>
  </fragment>
</template>

<script>
import ChangePassword from "../components/account/ChangePassword";
import ChangeEmail from "../components/account/ChangeEmail";
import GoingBackButton from "../components/navigationButton/GoingBackButton";

export default {
  name: "Account",

  components: {
    ChangePassword,
    ChangeEmail,
    GoingBackButton
  }
};
</script>
