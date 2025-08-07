<template>
  <header class="app-header">
    <div class="header-content">
      <router-link to="/" class="logo-link">
        <img src="../assets/unmatched_logo.webp" alt="Unmatched Logo" class="logo" />
        <span class="logo-text">Unmatchmaker</span>
      </router-link>

      <nav class="nav-menu">
        <router-link to="/pool" class="nav-link" active-class="active">Pool</router-link>
        <router-link to="/random-heroes" class="nav-link" active-class="active">Random Heroes</router-link>
        <router-link to="/random-maps" class="nav-link" active-class="active">Random Maps</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: white;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  padding: 12px 0;
  color: inherit;
  transition: opacity 0.2s;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
}

.nav-menu {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #6c757d;
  font-weight: 500;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s;
  position: relative;
}

.nav-link:hover {
  color: #2c3e50;
  background: #f8f9fa;
}

.nav-link.active {
  color: #007bff;
  background: #e7f3ff;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: #007bff;
  border-radius: 1px;
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
  }

  .logo {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    font-size: 1.25rem;
  }

  .nav-menu {
    gap: 16px;
  }

  .nav-link {
    font-size: 0.9rem;
    padding: 6px 8px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0 12px;
  }

  .logo {
    width: 28px;
    height: 28px;
  }

  .logo-text {
    font-size: 1.1rem;
  }

  .nav-menu {
    gap: 12px;
  }

  .nav-link {
    font-size: 0.85rem;
    padding: 4px 6px;
  }
}
</style>
