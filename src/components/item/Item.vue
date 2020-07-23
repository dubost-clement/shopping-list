<template>
  <table className="max-w-5xl">
    <thead>
      <tr>
        <th scope="col">Produit</th>
        <th scope="col">Quantité</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.key">
        <td data-label="Produit">{{ product.data.name }}</td>
        <td data-label="Quantité">{{ product.data.quantity }}</td>
        <td data-label="Actions">
          <button
            @click="deleteProduct(product.key, product.data.name)"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            type="button"
          >
            Supprimer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "Item",

  props: {
    products: {
      type: Array,
      required: true,
    },
  },

  methods: {
    deleteProduct(productId, productName) {
      Swal.fire({
        title: `Voulez vous vraiment supprimer ${productName} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("delete", productId);
        }
      });
    },
  },

  computed: {
    ...mapGetters(["actualUser"]),
  },
};
</script>

<style lang="scss">
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
