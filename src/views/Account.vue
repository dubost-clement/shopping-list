<template>
  <fragment>
    <Navigation />
    <div class="container mx-auto px-4 pt-12">
      <h1 class="text-center text-4xl my-10">Mon compte</h1>
      <ChangePassword />
      <ChangeEmail />
      <DeleteAccount />
      <GoingBackButton pathName="dashboard" />
    </div>
  </fragment>
</template>

<script>
import Navigation from "../components/navigation/Navigation";
import ChangePassword from "../components/account/ChangePassword";
import ChangeEmail from "../components/account/ChangeEmail";
import DeleteAccount from "../components/account/DeleteAccount";
import GoingBackButton from "../components/navigationButton/GoingBackButton";

export default {
  name: "Account",

  components: {
    Navigation,
    ChangePassword,
    ChangeEmail,
    DeleteAccount,
    GoingBackButton
  }
};
</script>
