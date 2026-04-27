# PHP 8.4 Syntax Scan Report

**Generated:** 04/27/2026 18:02:29  
**Project:** vcet

---

## Warnings

### Implicit nullable types (deprecated in PHP 8.4, use `?type`)

The following code uses implicit nullable types (e.g., `string $x = null` instead of `?string $x = null`). This is deprecated in PHP 8.4+, but will not break on PHP 8.3 (Bluehost):

- **app/Concerns/ProfileValidationRules.php**
  - Line 15: `protected function profileRules(?int $userId = null): array`
  - Line 38: `protected function emailRules(?int $userId = null): array`
- **app/Http/Controllers/PageDataController.php**
  - Line 287: `private function processAndStoreFiles(array $data, string $folderPath, ?string $aboutSection = null, array &$uploadedManagedPaths = []): array`
- **app/Http/Traits/HasPagination.php**
  - Line 37: `protected function paginateQuery(Builder|Model $query, ?Request $request = null): LengthAwarePaginator|array`
  - Line 93: `protected function getPerPage(?Request $request = null): int`
- **app/Http/Traits/InteractsWithPublicApiCache.php**
  - Line 12: `protected function publicCachedJson(string $scope, Closure $resolver, ?Request $request = null): JsonResponse`
- **app/Support/ProjectUploads.php**
  - Line 15: `public static function directory(?string $storedName = null): string`
  - Line 20: `public static function ensureDirectoryExists(?string $storedName = null): void`
  - Line 25: `public static function store(UploadedFile $file, ?string $preferredName = null): string`
  - Line 168: `private static function uniqueFileName(string $originalName, ?string $fallbackExtension = null): string`
  - Line 193: `private static function sanitizeFileName(string $fileName, ?string $fallbackExtension = null): string`
- **app/Support/PublicApiCache.php**
  - Line 17: `public static function remember(string $scope, Closure $resolver, ?Request $request = null): mixed`
  - Line 49: `private static function key(string $scope, ?Request $request = null): string`
- **database/seeders/ExamPageContentSeeder.php**
  - Line 154: `private function documentFromEntry(array $entry, ?string $descriptionSectionOverride = null): array`

---

**No PHP 8.4+ fatal errors found.**

Your code is safe for deployment on Bluehost (PHP 8.3). Only the above warnings are present, which are not breaking on PHP 8.3.
